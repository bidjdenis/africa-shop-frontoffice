import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CartComponent } from './cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    ShoppingCartComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
