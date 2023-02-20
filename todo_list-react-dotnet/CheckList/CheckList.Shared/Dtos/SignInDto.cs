﻿using System.Runtime.Serialization;

namespace CheckList.Shared;

[DataContract]
public record SignInDto
{
    [DataMember(Name = "email")]
    public string Email { get; init; } = null!;

    [DataMember(Name = "password")]
    public string Password { get; init; } = null!;
}
