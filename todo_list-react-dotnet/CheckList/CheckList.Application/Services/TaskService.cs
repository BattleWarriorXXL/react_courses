using CheckList.Domain;
using CheckList.Shared;

namespace CheckList.Application;

public class TaskService : ITaskService
{
    public Task<Guid> CreateAsync(TaskDto model)
    {
        throw new NotImplementedException();
    }

    public Task<TaskDto> GetByIdAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<TaskDto>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<TaskDto> UpdateAsync(Guid id, TaskDto model)
    {
        throw new NotImplementedException();
    }

    public Task<Guid> DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}
