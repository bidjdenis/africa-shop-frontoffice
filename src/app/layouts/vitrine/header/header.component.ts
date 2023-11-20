import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../service/category.service';
import { ProductService } from 'src/app/front-office/products/service/product.service';
import { Product } from 'src/app/front-office/products/models/product.model';
import { CartResponse } from '../models/cart-response.model';
import { AuthService } from 'src/app/front-office/auth/service/auth.service';
import { TokenStorageService } from 'src/app/front-office/auth/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  listProduct: Product[] = [];
  product: Product = new Product();
  listCategoryProduct: Category[] = [];
  badge: number = 0;
  montantTotal: number = 0;
  totalQuantity: number = 0;
  wishList: any;
  wishBadge: number = 0;
  listCart: CartResponse[] = [];
  currency: any;
  nombreMaxElements: number = 2;
  userInfos: any;
  currentUser: any;
  token: any;

  constructor(private service: CategoryService,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private loginService: AuthService,
    private tokenStorageService: TokenStorageService,) { }
  ngOnInit(): void {
    this.getCategoryProductList();
    this.getAllCart();
    this.getWihList();

    this.token = this.loginService.getToken();

    if (this.token != null) {
      this.getUser();
    }

    //this.getUserFromLocalStore();
  }

  // changeLanguage(language: string): void {
  //   this.translate.use(language);
  // }


  getCategoryProductList() {
    this.service.getCategorieProductList().subscribe((response: any) => {
      this.listCategoryProduct = response.data;
      console.log("Data ", this.listCategoryProduct);
    });
  }

  getAllCart() {
    this.productService.getListCart().subscribe((response: any) => {
      this.listCart = response.data;
      console.log("List Cart : ", this.listCart)
      this.badge = this.listCart.length;
      this.montantTotal = this.listCart.reduce((total, cart) => total + cart.price!, 0);
      this.totalQuantity = this.listCart.reduce((total, cart) => total + cart.quantity!, 0);
      this.currency = localStorage.getItem('currency');
      this.cdr.detectChanges();
    });
  }

  getWihList() {
    this.productService.getWishList().subscribe((response: any) => {
      this.wishList = response.data;
      this.wishBadge = this.wishList.length;
      this.cdr.detectChanges();
    });
  }

  getUser() {
    this.loginService.getUser().subscribe((response: any) => {
      this.userInfos = response.data;
      console.log("User infos", this.userInfos)
      this.tokenStorageService.saveUserInfos(JSON.stringify(this.userInfos));
    });
  }

  getUserFromLocalStore() {
    this.userInfos = localStorage.getItem('userInfos');
    this.currentUser = JSON.parse(this.userInfos)
  }

  removeCart(id: number) {
    this.productService.removeCart(id).subscribe((response: any) => {
      this.product = response.data;
      this.getAllCart();
    });

  }

  logOut() {
    this.tokenStorageService.removeUserInfos()
    this.tokenStorageService.removeToken()
    window.location.reload();
  }

  checkout() {
    this.tokenStorageService.saveCart(JSON.stringify(this.listCart));
  }


}
