import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/Product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    product?:IProduct;
    count:number=1;
  constructor(private _shopService:ShopService,private _route:ActivatedRoute) { }

  ngOnInit(): void {
    
this.getProduct(+this._route.snapshot.paramMap.get("id")!);
  }

  getProduct(id:number)
  {
    this._shopService.getProduct(id).subscribe(
      product=>this.product=product,
      error=>console.log(error))
  }

countUp(){
  this.count++;
}
countDown(){
  if(this.count>1)
  this.count--;
}


}
