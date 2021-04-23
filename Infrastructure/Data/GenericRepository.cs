using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        public DataContext _dataContext;

        public GenericRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dataContext.Set<T>().FindAsync(id);
        }

        public async Task<IReadOnlyList<T>> ListAllAsync()
        {
            return await _dataContext.Set<T>().ToListAsync();
        }

        public async Task<IReadOnlyList<T>> ListAllAsync(ISpecification<T> specification)
        {
              var query=ApplaySpecification(specification);
             return await query.ToListAsync();
        }

        
        public async Task<T> GetByIdAsync(ISpecification<T> specification)
        {
           var query=ApplaySpecification(specification);
             return await query.FirstOrDefaultAsync();
        }


        private IQueryable<T>ApplaySpecification(ISpecification<T> specification)
        {
             var query=_dataContext.Set<T>().AsQueryable();
             query=SpecificationEvaluator<T>.GetQuery(query,specification);
             return query;
        }

    }
}