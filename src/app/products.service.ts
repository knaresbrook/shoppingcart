import { productmodel } from './_models/productmodel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { products } from './_models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://localhost:5001/api/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  GetAll(): Observable<products[]> {
    return this.http.get<products[]>(this.baseUrl + 'Product/products');
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

  InsertProduct(prdmodel: productmodel) {
    return this.http
      .post(this.baseUrl + 'product/addproduct', JSON.stringify(prdmodel), {
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

  UpdateProduct(id: number, prdmodel: productmodel) {
    return this.http
      .put(
        this.baseUrl + 'product/updateproduct/' + id,
        JSON.stringify(prdmodel),
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((response: any) => {
          if (response) {
            console.log(response);
          }
        })
      );
  }
}
