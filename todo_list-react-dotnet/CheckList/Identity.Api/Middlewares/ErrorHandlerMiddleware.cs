using CheckList.Shared;
using System.Net;
using System.Text.Json;

namespace Identity.Api;

public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlerMiddleware> _logger;

    public ErrorHandlerMiddleware(RequestDelegate next, ILogger<ErrorHandlerMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, ex);

            var response = context.Response;
            response.ContentType = "application/json";

            response.StatusCode = ex switch
            {
                ApplicationException => (int)HttpStatusCode.BadRequest,
                WrongCredentialsException => (int)HttpStatusCode.Unauthorized,
                _ => (int)HttpStatusCode.InternalServerError,
            };

            var result = JsonSerializer.Serialize(new
            {
                message = ex.Message,
            });

            await response.WriteAsync(result);
        }
    }
}
