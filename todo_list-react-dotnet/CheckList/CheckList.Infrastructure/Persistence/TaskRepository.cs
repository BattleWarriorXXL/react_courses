using CheckList.Domain;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace CheckList.Infrastructure;

public class TaskRepository : ITaskRepository
{
    private readonly ApplicationDbContext _context;

    public TaskRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> CreateAsync(TaskEntity entity)
    {
        await _context.Tasks.AddAsync(entity);
        await _context.SaveChangesAsync();

        return entity.Id;
    }

    public async Task<TaskEntity?> GetByIdAsync(Guid id)
    {
        var task = await _context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
        return task;
    }

    public async Task<IEnumerable<TaskEntity>> GetAllAsync(Expression<Func<TaskEntity, bool>>? predicate = null)
    {
        if (predicate != null)
        {
            return await _context.Tasks.Where(predicate).ToListAsync();
        }
        
        return await _context.Tasks.ToListAsync();
    }

    public async Task<TaskEntity> UpdateAsync(TaskEntity entity)
    {
        _context.Tasks.Update(entity);
        await _context.SaveChangesAsync();

        return entity;
    }

    public async Task<Guid> DeleteAsync(TaskEntity entity)
    {
        _context.Tasks.Remove(entity);
        await _context.SaveChangesAsync();

        return entity.Id;
    }
}
