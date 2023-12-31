import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontOfficeComponent } from './front-office.component';
import { VitrineModule } from '../layouts/vitrine/vitrine.module';



@NgModule({
  declarations: [
    FrontOfficeComponent,
  ],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    VitrineModule
  ]
})
export class FrontOfficeModule { }
