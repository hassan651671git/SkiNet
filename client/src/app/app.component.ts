import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { ShopService } from './shop/shop.service';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Skinet';
 
  constructor(private shopService:ShopService,private basketService: BasketService){

  }
  ngOnInit(): void {
     
    this.basketService.getBasketFromLocalStorage();
    }
}
