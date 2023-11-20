import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../service/checkout.service';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../products/service/product.service';
import { Cart } from '../../products/models/cart.model';
import { CartResponse } from 'src/app/layouts/vitrine/models/cart-response.model';

@Component({
  selector: 'app-checkout-wrapper',
  templateUrl: './checkout-wrapper.component.html',
  styleUrls: ['./checkout-wrapper.component.scss']
})
export class CheckoutWrapperComponent implements OnInit {

  checkout: any;
  authTocken: any;
  valitionForm!: FormGroup;
  listCountry: any;
  listCart: CartResponse[] = [];
  storageData: any;
  totalPrice: number = 0;
  quantityTotal: number = 0;
  currency: any;
  isLoading: boolean = false;
  cartFromStore: any;

  constructor(private service: CheckoutService, private fb: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.valitionForm = this.fb.group({
      firstname: ['', Validators.required],
      name: ['', Validators.required],
      adress: ['', Validators.required],
      codePostal: ['', Validators.required],
      ville: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      idPays: [null, Validators.required],
      entrepriseName: ['', Validators.required],

    });
    this.getCountries();
    this.getAllCart();

  }

  getCountries() {
    this.productService.getAllCountry().subscribe((response: any) => {
      this.listCountry = response.data;
    });
  }

  addCheckout() {

    this.authTocken = this.service.getToken();
    this.cartFromStore = localStorage.getItem('cart');
    this.listCart = JSON.parse(this.cartFromStore);

    if (this.authTocken === null) {
      window.location.href = '/login';
    }

      console.log("Cart : ", this.listCart)
      this.isLoading = true;
      const formData = this.valitionForm.value;
      console.log("Validation : ", formData)
      this.service.addValidationCommande(formData).subscribe((response: any) => {
        console.log("Valition donnée : ", response.data)
        this.valitionForm.reset();
        this.isLoading = false;
      });
    

  }

  getAllCart() {
    this.storageData = localStorage.getItem('cart');
    this.listCart = JSON.parse(this.storageData);
    this.totalPrice = this.listCart.reduce((total, cart) => total + cart.price!, 0);
    this.quantityTotal = this.listCart.reduce((total, cart) => total + cart.quantity!, 0);
    this.currency = localStorage.getItem('currency');
    console.log("Cart data ", this.listCart)
  }

}
