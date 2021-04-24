using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using API.DTOs;
using System.Collections.Generic;
using API.Errors;

namespace API.Controllers
{
    
    public class ProductsController:BaseApiController
    {
        private IGenericRepository<Product> _productRepository;
        private IGenericRepository<ProductType> _productTypeRepository;
        private IGenericRepository<ProductBrand> _productBrandRepository;

        private IMapper _mapper ;

        public ProductsController(IGenericRepository<Product> productRepository,
        IGenericRepository<ProductBrand> productBrandRepository, 
        IGenericRepository<ProductType> productTypeRepository,IMapper mapper)
        {
            _productRepository = productRepository;
            _productBrandRepository = productBrandRepository;
            _productTypeRepository = productTypeRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var spec=new ProductsWithTypesAndBrandsSpecifications();
            var products=await this._productRepository.ListAllAsync(spec);
            var productsToReturn=_mapper.Map<IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(productsToReturn);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult>  GerProduct(int id)
        {
             var spec=new ProductsWithTypesAndBrandsSpecifications(id);
             var product=await _productRepository.GetByIdAsync(spec);
             if(product==null)
             {
               return NotFound(new ApiResponse(404));
             }
             var productToReturnDto=_mapper.Map<ProductToReturnDto>(product);
            return  Ok(productToReturnDto);
        }

        [HttpGet("brands")]
        public async Task<IActionResult>  GerProductBrands()
        {
            return  Ok(await this._productBrandRepository.ListAllAsync());
        }
        

        [HttpGet("types")]
        public async Task<IActionResult>  GerProductTypes()
        {
            return  Ok(await this._productTypeRepository.ListAllAsync());
        }
        
    }
}