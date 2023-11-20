import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { CheckoutWrapperComponent } from './checkout-wrapper/checkout-wrapper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [
    CheckoutComponent,
    BreadcrumbsComponent,
    CheckoutWrapperComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzSpinModule,
    NzInputModule,
    NzFormModule,
  ]
})
export class CheckoutModule { }
