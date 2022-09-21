import { ShoppingCartService } from './../shoppingcart.service';
import { AccountsService } from './../accounts.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  roles: any;

  constructor(
    public accountService: AccountsService,
    private router: Router,
    public shoppingcartService: ShoppingCartService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.accountService.logout().subscribe({
      next: () => {
        this.model = {};
        this.router.navigateByUrl('/login');
      },
    });
  }
}
