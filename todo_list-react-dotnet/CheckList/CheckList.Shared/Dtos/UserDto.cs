using System.Runtime.Serialization;

namespace CheckList.Shared;

[DataContract]
public record UserDto
{
    [DataMember(Name = "id")]
    public Guid Id { get; }

    [DataMember(Name = "email")]
    public string Email { get; } = null!;

    [DataMember(Name = "name")]
    public string Name { get; } = null!;
}
