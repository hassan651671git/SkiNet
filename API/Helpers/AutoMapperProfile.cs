using API.DTOs;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
        var mappingExpression=    CreateMap<Product,ProductToReturnDto>()
            .ForMember(d=>d.ProductType,options=>options.MapFrom(s=>s.ProductType.Name))
            .ForMember(d=>d.ProductBrand,options=>options.MapFrom(s=>s.ProductBrand.Name))
            .ForMember(d=>d.PictureUrl,opttion =>opttion.MapFrom<ProductUrlResolver>());
    
        }
    }
}