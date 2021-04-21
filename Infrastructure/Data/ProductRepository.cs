using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        DataContext _dataContext;

        public ProductRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Product> GetProductAsync(int id)
        {
           return await _dataContext.Products
           .Include(p=>p.ProductBrand)
          .Include(p=>p.ProductType)
           .FirstOrDefaultAsync(p =>p.Id==id);
        }

        

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
           return await _dataContext.Products
           .Include(p=>p.ProductBrand)
          .Include(p=>p.ProductType)
          .ToListAsync();
           
        }
        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
                {
                    return await _dataContext.ProductBrands.ToListAsync();
                }
        public async  Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _dataContext.ProductTypes.ToListAsync();
        }
    }
}