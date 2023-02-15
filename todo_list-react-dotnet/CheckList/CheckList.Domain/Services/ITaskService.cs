using CheckList.Shared;

namespace CheckList.Domain;

public interface ITaskService : IBaseService<Guid, TaskDto>
{
    Task<IEnumerable<TaskDto>> GetAllByUserIdAsync(string userId);
}
