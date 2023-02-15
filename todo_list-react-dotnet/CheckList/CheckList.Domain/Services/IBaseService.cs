namespace CheckList.Domain;

public interface IBaseService<TId, T> where TId : struct
                                      where T : class
{
    Task<TId> CreateAsync(T model);

    Task<T> GetByIdAsync(TId id);

    Task<IEnumerable<T>> GetAllAsync();

    Task<T> UpdateAsync(TId id, T model);

    Task<TId> DeleteAsync(TId id);
}
