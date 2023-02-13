import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { Basket, BaseketTotal, IBasket, IBasketItem } from "../shared/models/basket";
import { IProduct } from "../shared/models/Product";

@Injectable({ providedIn: 'root' })
export class BasketService {

    baseUrl = environment.apiUrl;
    private basketSource = new BehaviorSubject<IBasket>(new Basket());
    public basket$ = this.basketSource.asObservable();

    private basketTotal = new BehaviorSubject<BaseketTotal>({});
    public basketTotal$ = this.basketTotal.asObservable();
    private basket_id='basket_id';
    constructor(private httpClient: HttpClient) {

    }

    getBasket(id: string) {
        this.httpClient.get<IBasket>(this.baseUrl + "basket?id=" + id)
            .subscribe
            (
                (response: IBasket) => {
                    this.basketSource.next(response);
                    this.calculateTotal();
                    return response;
                },

                (error) => {
                    console.log(error);
                }

            )

    }

    setBasket(basket: IBasket) {
        this.httpClient.post<IBasket>(this.baseUrl + "basket", basket)
            .subscribe
            (
                (response: IBasket) => {
                    this.basketSource.next(response as IBasket);
                    this.calculateTotal();
                },

                (error) => {
                    console.log(error);
                }

            );

    }
    getBasketFromLocalStorage() {
        let basket = new Basket();
        if (localStorage.getItem(this.basket_id) === null) {
            localStorage.setItem(this.basket_id, basket.id);
            this.basketSource.next(basket);
            return;
        }
        else {
            this.getBasket(localStorage.getItem(this.basket_id)!);
        }

    }
    getCurrentBasketValue() {
        return this.basketSource.value;
    }

    addItemToBasket(item: IProduct, quantity = 1) {
        const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
        let basket = this.getCurrentBasketValue();
        basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
        this.setBasket(basket);

    }

    addOrUpdateItem(Items: IBasketItem[], itemToAdd: IBasketItem, quantity: number = 1): IBasketItem[] {
        const index = Items.findIndex(i => i.id === itemToAdd.id);
        if (index === -1) {
            itemToAdd.quantity = quantity;
            Items.push(itemToAdd);
        }

        else {
            Items[index].quantity += quantity;
        }

        return Items;
    }

    mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {

        var basketItem: IBasketItem = {
            id: item.id,
            productName: item.name,
            price: item.price,
            pictureUrl: item.pictureUrl,
            brand: item.productBrand,
            type: item.productType,
            quantity
        };
        return basketItem;
    }

    private calculateTotal() {
        const basket = this.getCurrentBasketValue();
        const subTotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
        const shipping = 0;
        const total = shipping + subTotal;
        this.basketTotal.next({ subTotal: subTotal, shipping: shipping, total: total });
        console.log(this.basketTotal.value);
    }

    countItemUp(item: IBasketItem) {
        const basket = this.getCurrentBasketValue();
        const index = basket.items.findIndex(x => x.id == item.id);

        if (index < 0) {
            return;
        }
            basket.items[index].quantity++;
    
        this.setBasket(basket);
    }

    countDown(item: IBasketItem) {
        const basket = this.getCurrentBasketValue();
        const index = basket.items.findIndex(x => x.id == item.id);

        if (index < 0) {
            return;
        }

        if (basket.items[index].quantity < 2) 
        {
            this.removeItemFromBasket(item);
            return;        
        }

        basket.items[index].quantity--;
        this.setBasket(basket);
    }

    removeItemFromBasket(item:IBasketItem)
    {
        const basket = this.getCurrentBasketValue();       
        basket.items = basket.items.filter(i => i.id != item.id);

        if(basket.items.length>0)
        {
            this.setBasket(basket);
            return;
        }

        this.removBasket(basket);
        
    }

    removBasket(basket:IBasket) 
    {
        this.httpClient.delete(this.baseUrl+"basket/?basketId="+basket.id)
        .subscribe(()=>{
            localStorage.removeItem(this.basket_id);
        }) ;
    }

}


;