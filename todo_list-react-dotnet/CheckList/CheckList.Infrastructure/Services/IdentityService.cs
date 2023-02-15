using CheckList.Application;
using CheckList.Domain;
using CheckList.Shared;
using IdentityModel.Client;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CheckList.Infrastructure;

public class IdentityService : IIdentityService
{
    private readonly UserManager<UserEntity> _userManager;
    private readonly SignInManager<UserEntity> _signInManager;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;
    private readonly ILogger<IdentityService> _logger;

    public IdentityService(
        UserManager<UserEntity> userManager,
        SignInManager<UserEntity> signInManager,
        IHttpClientFactory httpClientFactory,
        IConfiguration configuration,
        ILogger<IdentityService> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
        _logger = logger;
    }

    public async Task<TokenModel> SignInAsync(string email, string password)
    {
        var user = await _userManager.FindByNameAsync(email);
        if (user == null)
        {
            throw new UnauthorizedAccessException("Cannot find user by this email.");
        }

        var identityResult = await _signInManager.PasswordSignInAsync(email, password, false, false);
        if (!identityResult.Succeeded) { 
            throw new UnauthorizedAccessException("Wrong credentials.");
        }

        var accessToken = await RequestTokenAsync(email, password);
        return new TokenModel
        {
            UserId = user.Id,
            AccessToken = accessToken,
        };
    }

    public async Task<TokenModel> SignUpAsync(string email, string password)
    {
        var user = new UserEntity
        {
            Email = email,
            UserName = email
        };

        var identityResult = await _userManager.CreateAsync(user, password);
        if (!identityResult.Succeeded)
        {
            throw new UnauthorizedAccessException(identityResult.Errors.First().Description);
        }

        var accessToken = await RequestTokenAsync(email, password);

        return new TokenModel
        {
            UserId = user.Id,
            AccessToken = accessToken
        };
    }

    private async Task<string> RequestTokenAsync(string email,string password)
    {
        var httpClient = _httpClientFactory.CreateClient("Identity Server");
        var discovery = await httpClient.GetDiscoveryDocumentAsync();

        var tokenResponse = await httpClient.RequestPasswordTokenAsync(new PasswordTokenRequest
        {
            Address = discovery.TokenEndpoint,
            ClientId = _configuration["IdentityClient:ClientId"],
            GrantType = _configuration["IdentityClient:GrantType"],
            Scope = _configuration["IdentityClient:Scope"],
            UserName = email,
            Password = password
        });

        if (tokenResponse.IsError)
        {
            throw new UnauthorizedAccessException(tokenResponse.ErrorDescription);
        }

        return tokenResponse.AccessToken;
    }
}
