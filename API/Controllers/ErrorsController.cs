using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")]
    [ApiExplorerSettings(IgnoreApi=true)]
    public class ErrorsController:BaseApiController
    {
       public IActionResult error(int code){
           
           return new ObjectResult(new ApiResponse(code));
       } 
    }
}