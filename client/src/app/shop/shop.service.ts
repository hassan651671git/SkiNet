import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {map,catchError} from 'rxjs/operators';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/Product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/ShopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private baseUrl='https://localhost:5001/api/'
  constructor(private http:HttpClient) { }

  public getProducts(shopParams:ShopParams):Observable<IPagination>{
   let Params:HttpParams=new HttpParams();
   if(shopParams.brandId)
   {
    Params =Params.append("brandId",shopParams.brandId?.toString()!);
   }
   if(shopParams.typeId){
    Params =Params.append("typeId",shopParams.typeId?.toString()!);
   }
    if(shopParams.search && shopParams.search!="")
    {
      Params =Params.append("search",shopParams.search);
    }
   Params =Params.append("sort",shopParams.sort!);
   Params =Params.append("pageSize",shopParams.pageSize.toString());
   Params =Params.append("pageIndex",shopParams.pageIndex.toString());
   return this.http.get<IPagination>(this.baseUrl+"products",{params:Params});
    // .pipe(
    //   map((response)=>{return response.body;})
    // );
  }
  public getProduct(id:number):Observable<IProduct>{
        return this.http.get<IProduct>(this.baseUrl+"products/"+id);
  }
  public getBrands():Observable<IBrand[]>{
    return this.http.get<IBrand[]>(this.baseUrl+"products/brands");
 }
 public getTypes():Observable<IType[]>{
  return this.http.get<IType[]>(this.baseUrl+"products/types");
}
}
