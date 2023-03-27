using System.ComponentModel.DataAnnotations.Schema;

namespace CheckList.Domain;

public class TaskEntity : BaseEntity<Guid>
{
    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTimeOffset Date { get; set; }

    public bool IsCompleted { get; set; }

    public string UserId { get; set; } = null!;

    [ForeignKey("UserId")]
    public virtual UserEntity? User { get; set; }
}
