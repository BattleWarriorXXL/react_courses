using AutoMapper;
using CheckList.Domain;
using CheckList.Shared;
using Microsoft.Extensions.Logging;

namespace CheckList.Application;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _taskRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<TaskService> _logger;

    public TaskService(ITaskRepository taskRepository, IMapper mapper, ILogger<TaskService> logger)
    {
        _taskRepository = taskRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<Guid> CreateAsync(TaskDto model)
    {
        var taskEntity = _mapper.Map<TaskEntity>(model);
        taskEntity.CreatedDate = DateTime.UtcNow;
        taskEntity.UpdatedDate = DateTime.UtcNow;

        var taskId = await _taskRepository.CreateAsync(taskEntity);
        return taskId;
    }

    public async Task<TaskDto> GetByIdAsync(Guid id)
    {
        var taskEntity = await _taskRepository.GetByIdAsync(id);
        if (taskEntity == null)
        {
            throw new NotFoundException($"Task with {id} doesn't exist.");
        }

        return _mapper.Map<TaskDto>(taskEntity);
    }

    public async Task<IEnumerable<TaskDto>> GetAllAsync()
    {
        var taskEntities = await _taskRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<TaskDto>>(taskEntities);
    }

    public async Task<IEnumerable<TaskDto>> GetAllByUserIdAsync(string userId)
    {
        var taskEntities = await _taskRepository.GetAllAsync(t => t.UserId == userId);
        return _mapper.Map<IEnumerable<TaskDto>>(taskEntities);
    }

    public async Task<TaskDto> UpdateAsync(Guid id, TaskDto model)
    {
        await GetByIdAsync(id);

        var taskEntity = _mapper.Map<TaskEntity>(model);
        taskEntity.UpdatedDate = DateTime.UtcNow;

        var updatedTaskEntity = await _taskRepository.UpdatedAsync(taskEntity);

        return _mapper.Map<TaskDto>(updatedTaskEntity);
    }

    public async Task<Guid> DeleteAsync(Guid id)
    {
        var taskEntity = await _taskRepository.GetByIdAsync(id);
        if (taskEntity == null)
        {
            throw new NotFoundException($"Task with {id} doesn't exist.");
        }

        await _taskRepository.DeleteAsync(taskEntity);

        return id;
    }
}
