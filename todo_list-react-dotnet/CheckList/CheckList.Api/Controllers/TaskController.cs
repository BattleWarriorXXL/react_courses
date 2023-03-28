using CheckList.Domain;
using CheckList.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CheckList.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/users/{userId}/tasks")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly ILogger<TaskController> _logger;

    public TaskController(ITaskService taskService, ILogger<TaskController> logger)
    {
        _taskService = taskService;
        _logger = logger;
    }

    [HttpPost("create")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Create(string userId, TaskDto taskDto)
    {
        taskDto.UserId = userId;

        var taskId = await _taskService.CreateAsync(userId, taskDto);
        return Ok(taskId);
    }

    [HttpGet("{taskId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Get(string userId, string taskId)
    {
        var task = await _taskService.GetByIdAsync(userId, Guid.Parse(taskId));
        return Ok(task);
    }

    [HttpGet("get-all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(string userId)
    {
        var tasks = await _taskService.GetAllAsync(userId);
        return Ok(tasks);
    }

    [HttpPut("{taskId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Update(string userId, string taskId, TaskDto taskDto)
    {
        var updatedTask = await _taskService.UpdateAsync(userId, Guid.Parse(taskId), taskDto);
        return Ok(updatedTask);
    }

    [HttpDelete("{taskId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Delete(string userId, string taskId)
    {
        var deletedTaskId = await _taskService.DeleteAsync(userId, Guid.Parse(taskId));
        return Ok(deletedTaskId);
    }
}
