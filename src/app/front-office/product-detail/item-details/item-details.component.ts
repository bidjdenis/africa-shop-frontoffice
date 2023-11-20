import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../products/models/product.model';
import { ProductService } from '../../products/service/product.service';
import { Attachement } from '../../products/models/attachement.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart } from '../../products/models/cart.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TokenStorageService } from '../../auth/service/token-storage.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  product: Product = new Product();
  productId: number = 0;
  listAttachement: Attachement[] = [];
  cartFormGroup!: FormGroup;
  url!: string;
  cart: Cart = new Cart();
  myForm!: FormGroup;
  qutantiteList: any;
  quantity: number = 1;
  currency: string | undefined;
  isLoading: boolean = false;

  constructor(private service: ProductService, private activeRoute: ActivatedRoute, private fb: FormBuilder, private notification: NzNotificationService, private router: Router,) { }

  ngOnInit(): void {
    this.productId = this.activeRoute.snapshot.params['productKey']!;
    this.getProductById();
    this.getAttachements();
    this.getQuantitList();
    this.myForm = this.fb.group({
      quantity: ['', Validators.required],
      // ...
    });
  }

  getQuantity(event: any) {
    this.quantity = event;
    console.log("Quantity : ", this.quantity)
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


  onSubmit(template: TemplateRef<{}>) {
    this.isLoading = true;
    if (this.cart.quantity !== undefined) {
      this.service.addCartv2(this.product.id!, this.cart).subscribe((response: any) => {
        localStorage.setItem('currency', this.product.currency!);
        this.isLoading = false;
        window.location.reload();
      });
    } else {
      this.isLoading = false;
      this.notification.template(template);
    }
  }

  getProductById() {
    this.service.getProductById(this.productId).subscribe((response: any) => {
      this.product = response.data;
      this.url = this.product.imageName!;
      console.log("Detail : ", response.data);
    });
  }

  getAttachements() {
    this.service.getProductAttachement(this.productId).subscribe((response: any) => {
      this.listAttachement = response.data;
    });
  }

  getUrl(url: string) {
    this.url = url;
  }

  addToCart(template: TemplateRef<{}>) {
    this.notification.template(template);

  }

  addWish(id: number, template: TemplateRef<{}>) {
    this.service.addWish(id).subscribe((response: any) => {
      this.product = response.data;
    });
    window.location.reload();
  }


}
