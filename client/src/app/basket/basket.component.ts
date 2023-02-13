import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/Product';
import { ShopService } from '../shop/shop.service';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$?: Observable<IBasket>;
  constructor(private basketService: BasketService, private shopService: ShopService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }

  countUp(item: IBasketItem) {
    this.basketService.countItemUp(item);
  }

  countDown(item: IBasketItem) {
    this.basketService.countDown(item);
  }

}
