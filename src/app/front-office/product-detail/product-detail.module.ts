import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './product-detail.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ItemDetailsComponent } from './item-details/item-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductDetailComponent,
    BreadcrumbsComponent,
    ItemDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductDetailModule { }
