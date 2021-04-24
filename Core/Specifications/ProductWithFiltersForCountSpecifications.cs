using System;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFiltersForCountSpecifications : BaseSpecification<Product>
    {
        public ProductWithFiltersForCountSpecifications(ProductSpecParams productSpecParams)
         :base(x=>(!productSpecParams.BrandId.HasValue ||x.ProductBrandId==productSpecParams.BrandId)&&
        (!productSpecParams.TypeId.HasValue || x.ProductTypeId==productSpecParams.TypeId) &&
        (String.IsNullOrEmpty(productSpecParams.Search) || x.Name.ToLower().Contains(productSpecParams.Search)))
        {

        }
    }
}