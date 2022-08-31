import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountsService } from '../accounts.service';
import { Router } from '@angular/router';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private accountService: AccountsService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.accountService.getCurrentUser) {
      const token = this.accountService.getToken;

      const authreq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });

      console.log('Making an authorized request');
      request = authreq;
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private handleError = (error: HttpErrorResponse): any => {
    if (error.status === 404) {
      return this.handleNotFound(error);
    } else if (error.status === 400) {
      return this.handleBadRequest(error);
    }
  };

  private handleNotFound = (error: HttpErrorResponse): string => {
    this.router.navigate(['/404']);
    return error.message;
  };

  private handleBadRequest = (error: HttpErrorResponse): string => {
    if (this.router.url === '/register' || this.router.url === '/login') {
      let message = '';

      if (typeof error.error === 'string') {
        message = error.error;
        return message;
      }

      if (Array.isArray(error.error)) {
        for (let i = 0; i < error.error.length; i++) {
          message +=
            JSON.stringify(error.error[i].description).replace(/"/gi, '') +
            '<br>';
        }
      } else {
        const values = Object.values(error.error.errors);
        values.map((m: any) => {
          message += m + '<br>';
        });
      }

      return message.slice(0, -4);
    } else {
      return error.error ? error.error : error.message;
    }
  };
}
