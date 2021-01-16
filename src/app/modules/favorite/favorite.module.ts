import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteRoutingModule } from './favorite-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    FavoriteRoutingModule,
    LeafletModule
  ]
})
export class FavoriteModule { }
