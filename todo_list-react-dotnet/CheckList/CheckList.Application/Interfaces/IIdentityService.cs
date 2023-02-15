using CheckList.Shared;

namespace CheckList.Application;

public interface IIdentityService
{
    Task<TokenModel> SignInAsync(string email, string password);

    Task<TokenModel> SignUpAsync(string email, string password);
}
