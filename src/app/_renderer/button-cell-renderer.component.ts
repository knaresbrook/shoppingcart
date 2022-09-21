import { ShoppingCartService } from './../shoppingcart.service';
import { shoppingcart, cartitems } from './../_models/shoppingcart';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountsService } from './../accounts.service';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'btn-cell-renderer',
  template: `
    <button
      [hidden]="!this.roleflag"
      class="btn btn-info"
      (click)="btnEditClickedHander($event)"
    >
      Update Stock
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-warning" (click)="btnAddClickedHandler()">+</button>
    <span> {{ qty }} </span>
    <button class="btn btn-warning" (click)="btnMinusClickedHandler()">
      -
    </button>
  `,
})
export class ButtonCellRenderer implements ICellRendererAngularComp {
  refresh(params: ICellRendererParams<any, any>): boolean {
    return true;
  }
  private params: any;
  qty: number = 0;
  roleflag: boolean;

  agInit(params: any): void {
    this.params = params;
  }

  constructor(
    private accountsService: AccountsService,
    private router: Router,
    private toastr: ToastrService,
    private shoppingcartService: ShoppingCartService
  ) {
    this.roleflag = this.accountsService.getRoles == 'Admin' ? true : false;
  }

  btnEditClickedHander(e: any) {
    if (this.accountsService.getRoles == 'Admin')
      this.router.navigate(['/productdetails/' + this.params.data.id]);
    else this.toastr.info('Only Admin can update the stock..', 'Warning');
  }

  btnAddClickedHandler() {
    this.qty += 1;
    this.shoppingcartService.qty += 1;
    this.shoppingcartService.cartTotalItemsSubject.next(
      this.shoppingcartService.qty
    );
    this.addtoshoppingcart();
    this.params.clicked(this.qty);
  }

  btnMinusClickedHandler() {
    this.qty = this.qty > 0 ? this.qty - 1 : 0;
    this.shoppingcartService.qty -= 1;
    this.shoppingcartService.cartTotalItemsSubject.next(
      this.shoppingcartService.qty
    );
    this.params.clicked(this.qty);
  }

  private addtoshoppingcart() {
    if (this.shoppingcartService.firstItem) {
      this.shoppingcartService.guid = crypto.randomUUID();
      this.shoppingcartService.shopping = new shoppingcart(
        this.shoppingcartService.guid,
        this.accountsService.getCurrentUser,
        new Date()
      );
      this.shoppingcartService.firstItem = false;
    }
    this.addtocartitem();
  }

  private addtocartitem() {
    if (this.checkProduct()) {
      this.shoppingcartService.carts
        .filter((x) => x.productid == this.params.data.id)
        .forEach((x) => {
          x.quantity = this.shoppingcartService.qty;
        });
    } else {
      this.shoppingcartService.lineno += 1;
      this.shoppingcartService.carts.push(
        new cartitems(
          this.shoppingcartService.lineno,
          this.params.data.id,
          this.params.data.description,
          this.qty,
          this.params.data.price,
          this.shoppingcartService.guid
        )
      );
    }
    this.shoppingcartService.shopping.cartitems =
      this.shoppingcartService.carts;
    this.shoppingcartService.listcartItemsSubject.next(
      this.shoppingcartService.shopping
    );
  }

  private checkProduct() {
    if (
      this.shoppingcartService.carts.find(
        (x) => x.productid == this.params.data.id
      )
    )
      return true;
    else return false;
  }
}
