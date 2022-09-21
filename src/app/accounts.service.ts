import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  baseUrl: string = 'https://localhost:5001/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  textheaders = new HttpHeaders().set('ResponseType', 'text');

  public redirectUrl: string;
  roles: any;
  private currentUserSubject: BehaviorSubject<string>;
  private tokenSubject: BehaviorSubject<string>;
  private roleSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;
  public currentToken: Observable<string>;
  public currentRole: Observable<string>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('userToken') || '{}').userName
    );
    this.currentUser = this.currentUserSubject.asObservable();

    this.tokenSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('userToken') || '{}').token
    );
    this.currentToken = this.tokenSubject.asObservable();

    this.roleSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('userToken') || '{}').roleName
    );
    this.currentRole = this.roleSubject.asObservable();
  }

  public get getCurrentUser() {
    return this.currentUserSubject.value;
  }

  get getToken() {
    return this.tokenSubject.value;
  }

  get getRoles() {
    return this.roleSubject.value;
  }

  sharedfunction(user: any) {
    if (user) {
      localStorage.setItem('userToken', JSON.stringify(user));
      this.currentUserSubject.next(
        JSON.parse(localStorage.getItem('userToken') || '{}').userName
      );
      this.tokenSubject.next(
        JSON.parse(localStorage.getItem('userToken') || '{}').token
      );
      this.roleSubject.next(
        JSON.parse(localStorage.getItem('userToken') || '{}').roleName
      );
    }
  }

  login(model: any) {
    return this.http
      .post(this.baseUrl + 'account/login', JSON.stringify(model), {
        headers: this.headers,
      })
      .pipe(
        map((response: any) => {
          const user = response;
          this.sharedfunction(user);
        })
      );
  }

  logout() {
    return this.http.post(this.baseUrl + 'account/logout', null).pipe(
      map((response: any) => {
        localStorage.removeItem('userToken');
        this.currentUserSubject.next('');
        this.tokenSubject.next('');
        this.roleSubject.next('');
      })
    );
  }

  GetUsers() {
    return this.http.get(this.baseUrl + 'account/getusers');
  }

  // GetRole(e: string) {
  //   return this.http.get(this.baseUrl + `account/getrole?email=${e}`).pipe(
  //     map((role) => {
  //       this.roles = role;
  //     })
  //   );
  // }

  register(model: any) {
    return this.http
      .post(this.baseUrl + 'account/register', JSON.stringify(model), {
        headers: this.headers,
      })
      .pipe(
        map((response: any) => {
          const user = response;
          this.sharedfunction(user);
        })
      );
  }
}
