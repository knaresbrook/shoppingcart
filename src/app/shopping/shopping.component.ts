import { AccountsService } from './../accounts.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shoppingcart.service';
import { shoppingcart } from '../_models/shoppingcart';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  subTotal: number;
  vat: number;
  total: number;
  shopping: shoppingcart;
  disable: boolean = false;

  constructor(
    public shoppingcartService: ShoppingCartService,
    private router: Router,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    this.getSummary();
  }

  getSummary() {
    this.subTotal = this.shoppingcartService.getlistcartItems.cartitems.reduce(
      (sum, item) => (sum += (item.quantity || 0) * (item.price || 0)),
      0
    );
    this.vat = this.subTotal * 0.2;
    this.total = this.subTotal + this.vat;
  }

  clearShoppingCart() {
    this.shopping = new shoppingcart('', '', new Date());
    this.shopping.cartitems = [];

    this.shoppingcartService.qty = 0;
    this.shoppingcartService.carts = [];
    this.shoppingcartService.cartTotalItemsSubject.next(0);
    this.shoppingcartService.listcartItemsSubject.next(this.shopping);
    this.shoppingcartService.firstItem = true;
    this.shoppingcartService.guid = '';
    this.shoppingcartService.lineno = 0;
    this.subTotal = 0;
    this.total = 0;
    this.vat = 0;
    this.disable = true;
  }

  IncreaseQty(productid: number, price: number, quantity: number) {
    this.shoppingcartService.qty = quantity + 1;
    this.updateCart(productid);
  }

  DecreaseQty(productid: number, price: number, quantity: number) {
    this.shoppingcartService.qty = quantity - 1;
    this.updateCart(productid);
  }

  private updateCart(productid: number) {
    this.shoppingcartService.carts
      .filter((x) => x.productid == productid)
      .forEach((x) => {
        x.quantity = this.shoppingcartService.qty;
      });

    let qty = this.shoppingcartService.getlistcartItems.cartitems.reduce(
      (sum, item) => (sum += item.quantity || 0),
      0
    );

    this.shoppingcartService.cartTotalItemsSubject.next(qty);

    this.shoppingcartService.shopping.cartitems =
      this.shoppingcartService.carts;
    this.shoppingcartService.listcartItemsSubject.next(
      this.shoppingcartService.shopping
    );
    this.getSummary();
  }

  DeleteItem(productid: number) {
    this.shoppingcartService.carts.forEach((value, index) => {
      if (value.productid == productid)
        this.shoppingcartService.carts.splice(index, 1);
    });

    this.shoppingcartService.carts.forEach((value, index) => {
      value.id = index + 1;
    });

    let qty = this.shoppingcartService.getlistcartItems.cartitems.reduce(
      (sum, item) => (sum += item.quantity || 0),
      0
    );

    this.shoppingcartService.cartTotalItemsSubject.next(qty);

    this.shoppingcartService.shopping.cartitems =
      this.shoppingcartService.carts;
    this.shoppingcartService.listcartItemsSubject.next(
      this.shoppingcartService.shopping
    );
    this.getSummary();
  }

  Checkout() {
    if (this.accountsService.getCurrentUser) this.router.navigate(['/billing']);
    else this.router.navigate(['/accountdetails']);

    // this.shoppingcartService.shopping.cartitems =
    //   this.shoppingcartService.carts;
    // this.shoppingcartService
    //   .AddToCart(this.shoppingcartService.shopping)
    //   .subscribe({
    //     next: (val) => {
    //       this.clearShoppingCart();
    //     },
    //   });
  }
}
