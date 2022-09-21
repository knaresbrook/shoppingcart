import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _ } from 'ag-grid-community';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { shoppingcart, cartitems } from './_models/shoppingcart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  public cartTotalItemsSubject: BehaviorSubject<number>;
  public cartTotalItems: Observable<number>;
  public listcartItemsSubject: BehaviorSubject<shoppingcart>;
  public listcartItems: Observable<shoppingcart>;
  public qty = 0;
  public firstItem = true;
  public guid: string;
  public lineno: number = 0;
  public shopping: shoppingcart;
  carts: cartitems[] = [];
  baseUrl: string = 'https://localhost:5001/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {
    this.cartTotalItemsSubject = new BehaviorSubject<number>(0);
    this.cartTotalItems = this.cartTotalItemsSubject.asObservable();

    this.listcartItemsSubject = new BehaviorSubject<shoppingcart>(
      this.shopping
    );
    this.listcartItems = this.listcartItemsSubject.asObservable();
  }

  public get getcartTotalItems() {
    return this.cartTotalItemsSubject.value;
  }

  public get getlistcartItems() {
    return this.listcartItemsSubject.value;
  }

  AddToCart(cartmodel: shoppingcart) {
    return this.http
      .post(this.baseUrl + 'product/addtocart', JSON.stringify(cartmodel), {
        headers: this.headers,
      })
      .pipe(
        map((response: any) => {
          if (response) {
            console.log(response);
          }
        })
      );
  }
}
