using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        IBasketRepository _basketRepository;
        public BasketController(IBasketRepository repository)
        {
            _basketRepository=repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBasketById(string basketId)
        {
            var result= await _basketRepository.GetBasketAsync(basketId);
            return Ok(result ?? new CustomerBasket(basketId));
            
        }

        [HttpPost]
        public async Task<IActionResult>UpdateBasket(CustomerBasket basket)
        {
            var updatedBasket=await _basketRepository.UpdateBasketAsync(basket);
            return Ok(updatedBasket);

        }

        [HttpDelete]
        public async Task<IActionResult>DeleteBasketAsync(string basketId)
        {
             var result=await _basketRepository.DeleteBasketAsync(basketId);
             if(result)
            return Ok( );
            else
            return BadRequest("can't delete Basket ,either deleted or not created");

        }

    }
}