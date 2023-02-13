import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/Product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';
import { BasketService } from '../../basket/basket.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    product?:IProduct;
    count:number=1;
  constructor(private _shopService:ShopService,private _route:ActivatedRoute,private bcservice:BreadcrumbService,private basketService:BasketService) {
    this.bcservice.set('@productDetails',' ');
   }

  ngOnInit(): void {
this.getProduct(+this._route.snapshot.paramMap.get("id")!);
  }

  getProduct(id:number)
  {
    this._shopService.getProduct(id).subscribe(
      product=>{this.product=product;
        this.bcservice.set('@productDetails',this.product.name);
      },
      error=>console.log(error))
  }

countUp()
{
  this.count++;
}

countDown()
{
  if(this.count>1)
  this.count--;
}

addItemToBasket()
{
  this.basketService.addItemToBasket(this.product!,this.count);
}


}
