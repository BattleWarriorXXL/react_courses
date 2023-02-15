using IdentityServer4.Services;
using IdentityServer4.Validation;
using System.Security.Claims;

namespace Identity.Api;

public class ClaimsService : DefaultClaimsService
{
    public ClaimsService(IProfileService profile, ILogger<DefaultClaimsService> logger) : base(profile, logger)
    {

    }

    public override async Task<IEnumerable<Claim>> GetAccessTokenClaimsAsync(
        ClaimsPrincipal subject,
        ResourceValidationResult resourceResult,
        ValidatedRequest request)
    {
        var claims = (await base.GetAccessTokenClaimsAsync(subject, resourceResult, request)).ToList();
        claims.Add(new Claim("user_id", subject.FindFirstValue("sub") ?? string.Empty));

        return claims;
    }
}
