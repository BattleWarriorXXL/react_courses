using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;

namespace CheckList.Shared;

[DataContract]
public record LoginDto
{
    [Required]
    [DataMember(Name = "email")]
    public string Email { get; } = null!;

    [Required]
    [DataMember(Name = "password")]
    public string Password { get; } = null!;
}
