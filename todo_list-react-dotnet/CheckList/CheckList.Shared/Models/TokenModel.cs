namespace CheckList.Shared;

public record TokenModel
{
    public string UserId { get; init; } = null!;
    public string AccessToken { get; init; } = null!;
}
