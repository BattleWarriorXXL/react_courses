using System.Runtime.Serialization;

namespace CheckList.Shared;

[DataContract]
public record TokenModel
{
    [DataMember(Name = "userId")]
    public string UserId { get; init; } = null!;

    [DataMember(Name = "userEmail")]
    public string UserEmail { get; init; } = null!;

    [DataMember(Name = "accessToken")]
    public string AccessToken { get; init; } = null!;
}
