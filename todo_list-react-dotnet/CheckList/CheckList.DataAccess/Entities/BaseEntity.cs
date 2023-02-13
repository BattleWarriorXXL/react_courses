namespace CheckList.DataAccess.Entities;

public abstract class BaseEntity<T> where T : struct
{
    public T Id { get; set; }

    public DateTime CreatedDate { get; set; }

    public DateTime UpdatedDate { get; set; }

    public DateTime DeletedDate { get; set; }

    public bool IsDeleted { get; set; }
}
