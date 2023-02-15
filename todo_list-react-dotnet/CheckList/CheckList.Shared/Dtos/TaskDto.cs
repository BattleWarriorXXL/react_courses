using System.Runtime.Serialization;

namespace CheckList.Shared;

[DataContract]
public record TaskDto
{
    [DataMember(Name = "id")]
    public Guid Id { get; init; }

    [DataMember(Name = "title")]
    public string Title { get; init; } = null!;

    [DataMember(Name = "description")]
    public string? Description { get; init; }

    [DataMember(Name = "dueDate")]
    public DateTime DueDate { get; init; }

    [DataMember(Name = "createdDate")]
    public DateTime CreatedDate { get; init; }

    [DataMember(Name = "updatedDate")]
    public DateTime UpdatedDate { get; init; }

    [DataMember(Name = "isCompleted")]
    public bool IsCompleted { get; init; }
}
