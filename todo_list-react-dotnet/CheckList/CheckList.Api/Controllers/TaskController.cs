using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CheckList.Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly ILogger<TaskController> _logger;

        public TaskController(ILogger<TaskController> logger)
        {
            _logger = logger;
        }

        [HttpPost("create")]
        public IActionResult Create()
        {
            return Ok("created");
        }

        [HttpGet("get/{id}")]
        public IActionResult Get(Guid id)
        {
            return Ok($"got : {id}");
        }

        [HttpGet("get-all")]
        public IActionResult GetAll()
        {
            return Ok("got all");
        }

        [HttpPut("update/{id}")]
        public IActionResult Update(int id)
        {
            return Ok($"updated: {id}");
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            return Ok($"deleted: {id}");
        }
    }
}
