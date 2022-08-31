import { Observable } from 'rxjs';
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

  constructor(public accountService: AccountsService, private router: Router) {}

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
