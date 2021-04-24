using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecifications : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecifications(ProductSpecParams productSpecParams)
        :base(x=>
        (!productSpecParams.BrandId.HasValue ||x.ProductBrandId==productSpecParams.BrandId)&&
        (!productSpecParams.TypeId.HasValue || x.ProductTypeId==productSpecParams.TypeId)&&
        (String.IsNullOrEmpty(productSpecParams.Search) || x.Name.ToLower().Contains(productSpecParams.Search)))
        {
            AddInclude(x=>x.ProductBrand);
            AddInclude(x=>x.ProductType);
             ApplyPaginig((productSpecParams.PageIndex-1)*productSpecParams.PageSize,productSpecParams.PageSize);
              
            switch(productSpecParams.Sort)
            {
                case "priceAsc":
                    AddOrderBy(p=>p.Price);
                    break;
                case "priceDesc":
                    AddOrderBy(p=>p.Name);
                    break;
                default:
                    AddOrderBy(p=>p.Name);
                    break;

            }
           
            
        }

        public ProductsWithTypesAndBrandsSpecifications(int id) : base(x=>x.Id==id)
        {
    
            AddInclude(x=>x.ProductBrand);
            AddInclude(x=>x.ProductType);
        }
    }
}