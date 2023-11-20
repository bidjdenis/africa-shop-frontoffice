import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from './hero/hero.component';
import { FeaturedCategoriesComponent } from './featured-categories/featured-categories.component';
import { TrendingProductComponent } from './trending-product/trending-product.component';
import { ShippingInfoComponent } from './shipping-info/shipping-info.component';
import { HttpClientModule } from '@angular/common/http';
import { NzCarouselModule, } from 'ng-zorro-antd/carousel';



@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    FeaturedCategoriesComponent,
    TrendingProductComponent,
    ShippingInfoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    NzCarouselModule,
   
    

  ]
})
export class HomeModule { }
