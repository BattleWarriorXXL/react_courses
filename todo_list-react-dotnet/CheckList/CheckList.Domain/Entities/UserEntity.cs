using Microsoft.AspNetCore.Identity;

namespace CheckList.Domain;

public class UserEntity : IdentityUser
{
    public override string? Email { get; set; } = null!;

    public override string? UserName { get; set; } = null!;
}
