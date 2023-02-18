using CheckList.Shared.Models;

namespace CheckList.BusinessLogic
{
    public class UserService : IUserService
    {
        public Task<Guid> CreateAsync(TaskDto model)
        {
            throw new NotImplementedException();
        }

        public Task<Guid> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TaskDto>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<TaskDto> GetByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<TaskDto> UpdateAsync(Guid id, TaskDto model)
        {
            throw new NotImplementedException();
        }
    }
}
