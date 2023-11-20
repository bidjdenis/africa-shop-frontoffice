import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cart } from "../../products/models/cart.model";

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    url: string = 'validation_command';



    constructor(private http: HttpClient) { }


    getToken() {
        const token = localStorage.getItem('token');
        return token;
    }


    addValidationCommande(validation: any): Observable<any> {
        const authTocken = this.getToken();
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTocken}`
        });
        return this.http.post(`${this.url}/save`, validation, { headers: headers });
    }

}