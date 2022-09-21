import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { category } from './_models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseUrl: string = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  GetAll(): Observable<category[]> {
    return this.http.get<category[]>(this.baseUrl + 'category/categories');
  }

  GetById(Id: any) {
    return this.http.get(this.baseUrl + 'category/categories/' + Id).pipe(
      map((category: any) => {
        if (category) {
          return category;
        }
      })
    );
  }
}
