using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController:BaseApiController
    {
        DataContext _context;

        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public IActionResult getNotFound(){
               var thing=_context.Products.Find(55);
               if(thing==null)
               {
                 return NotFound(new ApiResponse(404));
               }
            return NotFound();
        }
         [HttpGet("servererror")]
        public IActionResult getServerError(){
            var thing=_context.Products.Find(55);
            var thingToReturn=thing.ToString();

            return Ok();
        }


         [HttpGet("badrequest")]
        public IActionResult gebadRequest(){


            return BadRequest();
        }


         [HttpGet("badrequest/{id}")]
        public IActionResult getNotFoundRequest(int id){
            return Ok();
        }
    }
}