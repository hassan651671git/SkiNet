using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController:ControllerBase
    {
        private DataContext _dataContext;

        public ProductsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await this._dataContext.Products.ToListAsync());

        }

        [HttpGet("{id}")]
        public async Task<IActionResult>  GerProduct(int id)
        {
            return  Ok(await _dataContext.Products.FirstOrDefaultAsync(p =>p.Id==id));
        }
        
    }
}