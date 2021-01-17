import { MapService } from './../../../modules/map/services/map.service';
import { Address } from './../../models/Address';
import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address/address.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  locationcs: Address[];
  constructor(
    private addressService: AddressService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.addressService.publicAddresses.subscribe(res => {
      this.locationcs = res;
    });
  }

  moveToView(lat: number, lng: number) {
    this.mapService.moveToView(lat, lng)
  }

}
