using CheckList.Shared;

namespace CheckList.Domain;

public interface ITaskService : IBaseService<Guid, TaskDto>
{
    Task<Guid> CreateAsync(string userId, TaskDto taskDto);

    Task<TaskDto> GetByIdAsync(string userId, Guid taskId);

    Task<IEnumerable<TaskDto>> GetAllAsync(string userId);

    Task<TaskDto> UpdateAsync(string userId, Guid taskId, TaskDto taskDto);

    Task<Guid> DeleteAsync(string userId, Guid taskId);
}
