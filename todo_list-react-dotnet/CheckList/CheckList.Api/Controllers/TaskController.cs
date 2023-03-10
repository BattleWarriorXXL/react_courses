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
    public async Task<IActionResult> Get(string userId, Guid taskId)
    {
        var task = await _taskService.GetByIdAsync(userId, taskId);
        return Ok(task);
    }

    [HttpGet("get-all")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(string userId)
    {
        var tasks = await _taskService.GetAllAsync(userId);
        return Ok(tasks);
    }

    [HttpPut("update/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Update(string userId, TaskDto taskDto)
    {
        var updatedTask = await _taskService.UpdateAsync(userId, taskDto.Id, taskDto);
        return Ok(updatedTask);
    }

    [HttpDelete("delete/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> Delete(string userId, Guid taskId)
    {
        var deletedTaskId = await _taskService.DeleteAsync(userId, taskId);
        return Ok(deletedTaskId);
    }
}
