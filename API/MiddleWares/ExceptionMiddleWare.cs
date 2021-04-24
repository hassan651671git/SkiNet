using System;
using System.Text.Json;
using System.Threading.Tasks;
using API.Errors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace API.MiddleWares
{
    public class ExceptionMiddleWare
    {
        private readonly RequestDelegate _next;
        private readonly IHostingEnvironment _environment;
        public ExceptionMiddleWare(RequestDelegate next, IHostingEnvironment environment)
        {
            _environment = environment;
            _next = next;
        }



        public async  Task InvokeAsync(HttpContext context)
        {
            try
            {
                await  _next.Invoke(context);
            }catch(Exception ex)
            {
               var apiException =new ApiException(StatusCodes.Status500InternalServerError);  
               if(_environment.IsDevelopment())
               {
                   apiException.Message=ex.Message;
                  apiException.Details=ex.StackTrace;
               }
               context.Response.ContentType="application/json";
               context.Response.StatusCode=StatusCodes.Status500InternalServerError; 
               
               var jsonOptions=new JsonSerializerOptions();
               jsonOptions.PropertyNamingPolicy=JsonNamingPolicy.CamelCase;
               var jsonResponse=JsonSerializer.Serialize(apiException,jsonOptions);
              await context.Response.WriteAsync(jsonResponse);
            }
              

        }
    }
}