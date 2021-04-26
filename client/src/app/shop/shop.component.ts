import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/Product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/ShopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  products?:IProduct[] ;
  paginationData?:IPagination;
  types?:IType[];
  brands?:IBrand[];
  shopParams:ShopParams=new ShopParams();
  sortOptions=
  [
    {name:'Alphapitical',value:'name'},
    {name:'Price: Low To High',value:'priceAsc'},
    {name:'Price: high To Low',value:'priceDesc'}
  ];
  constructor(private shopService:ShopService) { }

  ngOnInit(): void {
   this.getProducts();
   this.getTypes();
   this.getBrands();

   
    
  }
  getProducts(){
    this.shopParams.pageIndex=1;
    this.shopService.getProducts(this.shopParams!).subscribe(
      
      (response)=>{
        this.paginationData=response;
        this.products=response.data;
      },

      error=>{console.error(error)}
    );
  }
  getBrands(){
    this.shopService.getBrands().subscribe(
      (response)=>{this.brands=[{id:0,name:"All"},...response];},

      error=>{console.error(error)}
    );

  }

  getTypes(){
    this.shopService.getTypes().subscribe(
      (response)=>{this.types=[{id:0,name:"All"},...response];},

      error=>{console.error(error)}
    );
  }
onBrandSelected(id:number){
  this.shopParams.brandId =id;
  this.getProducts()
}
onTypeSelected(id:number){
  this.shopParams.typeId=id;
  this.getProducts();
}
onSortChanged(event:Event)
{
   this.shopParams.sort=(event.target as HTMLInputElement).value;
  
   this.getProducts();
}
onSearchBtnClicked()
{

this.getProducts();
}
onResetBtnClicked()
{

this.shopParams=new ShopParams();
this.getProducts();
}
pageChanged(event: any): void {
  if(this.shopParams.pageIndex!=event.page){
    this.shopParams.pageIndex= event.page!;
    this.getProducts();
  }

}
}
