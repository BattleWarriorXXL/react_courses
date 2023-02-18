using System.Linq.Expressions;

namespace CheckList.Domain;

public interface IRepository<TId, T> where TId : struct
                                         where T : class
{
    Task<TId> CreateAsync(T entity);

    Task<T?> GetByIdAsync(TId id);

    Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>>? predicate = null);

    Task<T> UpdatedAsync(T entity);

    Task<TId> DeleteAsync(T entity);
}
