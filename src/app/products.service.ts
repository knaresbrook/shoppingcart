import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { products } from './_models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<products[]> {
    return this.http.get<products[]>(this.baseUrl + 'Product');
  }

  GetById(Id: Number) {
    return this.http.get(this.baseUrl + 'Product/products/' + Id).pipe(
      map((product: any) => {
        if (product) {
          return product;
        }
      })
    );
  }
}
