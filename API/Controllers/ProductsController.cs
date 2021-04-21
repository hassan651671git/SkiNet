using System.Threading.Tasks;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController:ControllerBase
    {
        private IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            return Ok(await this._productRepository.GetProductsAsync());

        }

        [HttpGet("{id}")]
        public async Task<IActionResult>  GerProduct(int id)
        {
            return  Ok(await _productRepository.GetProductAsync(id));
        }

        [HttpGet("brands")]
        public async Task<IActionResult>  GerProductBrands()
        {
            return  Ok(await _productRepository.GetProductBrandsAsync());
        }
        

        [HttpGet("types")]
        public async Task<IActionResult>  GerProductTypes()
        {
            return  Ok(await _productRepository.GetProductTypesAsync());
        }
        
    }
}