import { MapService } from './../../../modules/map/services/map.service';
import { Address } from './../../models/Address';
import { Component, OnInit } from '@angular/core';
import { AddressService } from '../../services/address/address.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateEditAddressComponent } from 'src/app/modules/map/components/create-edit-address/create-edit-address.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  locationcs: Address[];
  constructor(
    private addressService: AddressService,
    private mapService: MapService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit(): void {
    this.addressService.publicAddresses.subscribe(res => {
      this.locationcs = res;
    });
  }

  editAddress(address: Address) {
    const bottomSheetRef = this.bottomSheet.open(CreateEditAddressComponent,
      {
        disableClose: true,
        hasBackdrop: false,
        data: {
          action: 'edit',
          address
        }
      }
    );
  }

  newAddress() {
    const bottomSheetRef = this.bottomSheet.open(CreateEditAddressComponent,
      {
        disableClose: true,
        hasBackdrop: false,
        data: {
          action: 'create',
        }
      }
    );
  }

  moveToView(lat: number, lng: number) {
    this.mapService.moveToView(lat, lng)
  }

}
