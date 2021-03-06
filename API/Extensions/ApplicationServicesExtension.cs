using System.Linq;
using API.Errors;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using StackExchange.Redis;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {

            services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
            services.AddScoped<IBasketRepository,BasketRepository>();
            services.Configure<ApiBehaviorOptions>(options=>{
                options.InvalidModelStateResponseFactory=actionContext=>
                {
                    var errors=actionContext.ModelState.Where(e =>e.Value.Errors.Count>0)
                    .SelectMany(p =>p.Value.Errors)
                    .Select(x =>x.ErrorMessage).ToArray();
                    var errorResponse=new ApiValidationErrorResponse();
                    errorResponse.Errors=errors;
                    return new BadRequestObjectResult(errorResponse);
                       
                };
            });
            return services;
        }
        
    }
}