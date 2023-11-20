import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';


@NgModule({
  declarations: [
    AuthComponent,
    BreadcrumbsComponent,
    AccountLoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzSpinModule
  ]
})
export class AuthModule { }
