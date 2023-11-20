import { Component, OnInit } from '@angular/core';
import { Product } from '../../products/models/product.model';
import { ProductService } from '../../products/service/product.service';

@Component({
  selector: 'app-featured-categories',
  templateUrl: './featured-categories.component.html',
  styleUrls: ['./featured-categories.component.scss']
})
export class FeaturedCategoriesComponent implements OnInit {

  listFeatured: any;


  constructor(private service: ProductService) { }

  ngOnInit(): void {
    this.getAllFeaturedCategories();
  }

  getAllFeaturedCategories() {
    this.service.getListFeaturedCategoreis().subscribe((response: any) => {

      if (response.data != undefined) {
        this.listFeatured = response.data;
        console.log("Liste des Featured ", this.listFeatured)
      }
    });
  }


}
