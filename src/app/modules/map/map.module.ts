import { BaseModule } from './../../shared/modules/base/base.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LandingComponent } from './components/landing/landing.component';
import { CreateEditAddressComponent } from './components/create-edit-address/create-edit-address.component';


@NgModule({
  declarations: [LandingComponent, CreateEditAddressComponent],
  imports: [
    BaseModule,
    CommonModule,
    MapRoutingModule,
    LeafletModule
  ]
})
export class MapModule { }
