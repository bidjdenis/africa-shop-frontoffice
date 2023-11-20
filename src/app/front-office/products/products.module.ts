import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ProductGridsComponent } from './product-grids/product-grids.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProductsComponent,
    BreadcrumbsComponent,
    ProductGridsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule

  ]
})
export class ProductsModule { }
