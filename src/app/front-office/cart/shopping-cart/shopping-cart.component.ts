import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from '../../products/service/product.service';
import { Product } from '../../products/models/product.model';
import { CartResponse } from 'src/app/layouts/vitrine/models/cart-response.model';
import { Cart } from '../../products/models/cart.model';
import { TokenStorageService } from '../../auth/service/token-storage.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  listProduct: Product[] = [];
  product: Product = new Product();
  montantTotal: number = 0;
  listCart: CartResponse[] = [];
  currency: any;
  totalQuantity: number = 0;
  qutantiteList: any;
  quantity: number = 0;
  cart: Cart = new Cart();


  constructor(private service: ProductService, private cdr: ChangeDetectorRef, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.getAllCart();
    this.getQuantitList();
  }
  getQuantity(event: any, id: number) {
    this.quantity = event;
    this.service.updateCart(id, this.quantity).subscribe((response: any) => {
      console.log("Id Product : ", id)
      console.log("Quantity : ", this.quantity)
    });

  }

  getAllCart() {
    this.service.getListCart().subscribe((response: any) => {
      this.listCart = response.data;
      console.log("List Cart : ", this.listCart)
      this.montantTotal = this.listCart.reduce((total, cart) => total + cart.price!, 0);
      this.totalQuantity = this.listCart.reduce((total, cart) => total + cart.quantity!, 0);
      this.currency = localStorage.getItem('currency');
      this.cdr.detectChanges();
    });
  }

  getQuantitList() {
    this.qutantiteList = [
      {
        quantite: 1
      },
      {
        quantite: 2
      },
      {
        quantite: 3
      },
      {
        quantite: 5
      },
      {
        quantite: 6
      },
      {
        quantite: 7
      },
      {
        quantite: 8
      },
      {
        quantite: 9
      },
      {
        quantite: 10
      }
    ];
  }

  checkout() {
    this.tokenStorageService.saveCart(JSON.stringify(this.listCart));
  }

  removeCart(id: number) {
    this.service.removeCart(id).subscribe((response: any) => {
      this.product = response.data;
      this.getAllCart();
      window.location.reload();
    });

  }


}
