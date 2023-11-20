import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { VitrineModule } from './vitrine/vitrine.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    VitrineModule,
  ],
  exports: [
    VitrineModule
  ]
})
export class LayoutsModule { }
