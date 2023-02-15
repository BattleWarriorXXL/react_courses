using System.Runtime.Serialization;

namespace CheckList.Shared;

[DataContract]
public record TaskDto
{
    [DataMember(Name = "id")]
    public Guid Id { get; }

    [DataMember(Name = "title")]
    public string Title { get; } = null!;

    [DataMember(Name = "description")]
    public string? Description { get; }

    [DataMember(Name = "dueDate")]
    public DateTime DueDate { get; }

    [DataMember(Name = "createdDate")]
    public DateTime CreatedDate { get; }

    [DataMember(Name = "updatedDate")]
    public DateTime UpdatedDate { get; }

    [DataMember(Name = "isCompleted")]
    public bool IsCompleted { get; }
}
