import { MapService } from './../../../modules/map/services/map.service';
import { Address } from './../../models/Address';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AddressService } from '../../services/address/address.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CreateEditAddressComponent } from 'src/app/modules/map/components/create-edit-address/create-edit-address.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @ViewChild('menu') public menu: MatDrawer;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  locationcs: Address[];

  constructor(
    private addressService: AddressService,
    private mapService: MapService,
    private bottomSheet: MatBottomSheet,
    private menuService: MenuService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.addressService.publicAddresses.subscribe(res => {
      this.locationcs = res;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  editAddress(address: Address) {
    if(this.mobileQuery.matches){
      this.menuService.close();
    }
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
    if(this.mobileQuery.matches){
      this.menuService.close();
    }
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
