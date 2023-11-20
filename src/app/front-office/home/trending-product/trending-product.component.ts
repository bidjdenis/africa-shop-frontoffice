import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../../products/service/product.service';
import { Product } from '../../products/models/product.model';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-trending-product',
  templateUrl: './trending-product.component.html',
  styleUrls: ['./trending-product.component.scss']
})
export class TrendingProductComponent implements OnInit {

  listTending: any;

  constructor(private service: ProductService, private notification: NzNotificationService) { }
  ngOnInit(): void {
    this.getAllTending();
  }


  getAllTending() {
    this.service.getListTending().subscribe((response: any) => {
      this.listTending = response.data;
    });
  }

  addToCart(id: number, template: TemplateRef<{}>) {
    this.service.addCart(id).subscribe((response: any) => {
      //this.product = response.data;
      // alert(response.message);
      this.service.getListCart().subscribe((newListe) => {
        console.log("Cart List", newListe);
      });

    });
    this.notification.template(template);
  }

  createBasicNotification(template: TemplateRef<{}>): void {
    console.log("J'ai cliqué")
    this.notification.template(template);
  }

  getStarArray(star: string): number[] {
    const starNumner = parseInt(star);
    return new Array(starNumner);
  }

}
