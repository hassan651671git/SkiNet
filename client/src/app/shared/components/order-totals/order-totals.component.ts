import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { BaseketTotal } from '../../models/basket';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {

  basketTotals$?:Observable<BaseketTotal>;
  constructor(private basketService:BasketService) { 

    this.basketTotals$=this.basketService.basketTotal$;

  }

  ngOnInit(): void {
  }

}
