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

    public async Task<Guid> CreateAsync(TaskDto taskDto)
    {
        var taskEntity = _mapper.Map<TaskEntity>(taskDto);
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

    public async Task<IEnumerable<TaskDto>> GetAllAsync(string userId)
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

    public async Task<Guid> CreateAsync(string userId, TaskDto taskDto)
    {
        taskDto.UserId = userId;

        var taskEntity = _mapper.Map<TaskEntity>(taskDto);
        taskEntity.CreatedDate = DateTime.UtcNow;
        taskEntity.UpdatedDate = DateTime.UtcNow;

        var taskId = await _taskRepository.CreateAsync(taskEntity);
        return taskId;
    }

    public async Task<TaskDto> GetByIdAsync(string userId, Guid taskId)
    {
        var taskEntity = (await _taskRepository.GetAllAsync(t => t.UserId == userId && t.Id == taskId))
                                               .FirstOrDefault();
        if (taskEntity == null)
        {
            throw new NotFoundException($"Task with {taskId} doesn't exist.");
        }

        return _mapper.Map<TaskDto>(taskEntity);
    }

    public async Task<TaskDto> UpdateAsync(string userId, Guid taskId, TaskDto taskDto)
    {
        await GetByIdAsync(userId, taskId);

        var taskEntity = _mapper.Map<TaskEntity>(taskDto);
        taskEntity.UpdatedDate = DateTime.UtcNow;

        var updatedTaskEntity = await _taskRepository.UpdatedAsync(taskEntity);

        return _mapper.Map<TaskDto>(updatedTaskEntity);
    }

    public async Task<Guid> DeleteAsync(string userId, Guid taskId)
    {
        var taskEntity = (await _taskRepository.GetAllAsync(t => t.UserId == userId && t.Id == taskId))
                                               .FirstOrDefault();
        if (taskEntity == null)
        {
            throw new NotFoundException($"Task with {taskId} doesn't exist.");
        }

        await _taskRepository.DeleteAsync(taskEntity);

        return taskId;
    }
}
