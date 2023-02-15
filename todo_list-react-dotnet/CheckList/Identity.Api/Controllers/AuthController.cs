using CheckList.Application;
using CheckList.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Identity.Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IIdentityService _identityService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IIdentityService identityService, ILogger<AuthController> logger)
    {
        _identityService= identityService;
        _logger = logger;
    }

    [HttpPost("signin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> SignIn(SignUpDto signUpDto)
    {
        var token = await _identityService.SignInAsync(signUpDto.Email, signUpDto.Password);
        return Ok(token);
    }

    [HttpPost("signup")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> SignUp(SignUpDto signUpDto)
    {
        var token = await _identityService.SignUpAsync(signUpDto.Email, signUpDto.Password);
        return Ok(token);
    }
}
