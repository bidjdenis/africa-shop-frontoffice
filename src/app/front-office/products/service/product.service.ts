import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Cart } from '../models/cart.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'product';

  countryUrl = 'country';

  constructor(private http: HttpClient) { }

  private cartListSubject = new BehaviorSubject<Object[]>([]);

  getListProductCartObservable(): Observable<Object[]> {
    return this.cartListSubject.asObservable();
  }

  getAllCountry(): Observable<any> {
    return this.http.get(`${this.countryUrl}/all`);
  }

  getAllProductList(): Observable<any> {
    return this.http.get(`${this.url}/all`);
  }

  getAllProductListByCountry(id: number): Observable<any> {
    return this.http.get(`${this.url}/country/${id}`);
  }

  getAllProductListByCountryAndCategroy(idCountry: number, idCategory: number): Observable<any> {
    return this.http.get(`${this.url}/category/${idCategory}/country/${idCountry}`);
  }


  getProductByCategory(id: number): Observable<any> {
    return this.http.get(`${this.url}/category/${id}`);
  }

  addCart(id: number): Observable<Object> {
    return this.http.get(`${this.url}/add-cart/${id}`);
  }

  addCartv2(id: number, cart: Cart): Observable<any> {
    return this.http.post(`${this.url}/${id}/add-cart`, cart);
  }

  updateCart(id: number, quantity: number): Observable<any> {
    return this.http.get(`${this.url}/${id}/quantity/${quantity}/update-cart`);
  }


  addWish(id: number): Observable<Object> {
    return this.http.get(`${this.url}/add-wish/${id}`);
  }

  removeCart(id: number): Observable<Object> {
    return this.http.get(`${this.url}/remove-cart/${id}`);
  }

  getWishList(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/wish/all`);
  }

  getWishListByProduct(id: number): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/wish/product-id/${id}`);
  }

  getListCart(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/cart/all`).pipe(
      tap((newListe) => {
        this.cartListSubject.next(newListe);
      })
    );
  }

  getListFeaturedCategoreis(): Observable<any> {
    return this.http.get(`${this.url}/featured-categories/all`);
  }

  getListTending(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.url}/tending/all`);
  }

  getProductById(id: number): Observable<Object> {
    return this.http.get(`${this.url}/${id}`);
  }


  getProductAttachement(id: number): Observable<Object> {
    return this.http.get(`${this.url}/attachement/${id}`);
  }

  getSearch(search: string): Observable<any> {
    return this.http.get<any>(`${this.url}/search/${search}`);
  }




}
