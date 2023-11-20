import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = 'product_category';

  constructor(private http: HttpClient) { }

  getCategorieProductList(): Observable<Object> {
    return this.http.get(`${this.url}/all`);
  }

}
