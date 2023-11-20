import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
  })
  export class UserService {

    constructor(private http: HttpClient) {}

    addUser(user: User): Observable<Object> {
        return this.http.post(`register/customer`, user);
      }
    


  }