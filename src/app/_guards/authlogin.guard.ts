import { AccountsService } from './../accounts.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthloginGuard implements CanActivate {
  constructor(
    private accountService: AccountsService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.accountService.getCurrentUser) {
      this.router.navigate(['/register']);
      return false;
    }
    return true;
  }
}
