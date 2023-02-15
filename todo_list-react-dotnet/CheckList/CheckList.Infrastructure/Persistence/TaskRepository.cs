using CheckList.Domain;
using System.Linq.Expressions;

namespace CheckList.Infrastructure;

public class TaskRepository : ITaskRepository
{
    public Task<Guid> CreateAsync(TaskEntity entity)
    {
        throw new NotImplementedException();
    }

    public Task<TaskEntity?> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<TaskEntity>> GetAllAsync(Expression<Func<TaskEntity, bool>>? predicate = null)
    {
        throw new NotImplementedException();
    }

    public Task<TaskEntity> UpdatedAsync(TaskEntity entity)
    {
        throw new NotImplementedException();
    }

    public Task<Guid> DeleteAsync(TaskEntity entity)
    {
        throw new NotImplementedException();
    }
}
