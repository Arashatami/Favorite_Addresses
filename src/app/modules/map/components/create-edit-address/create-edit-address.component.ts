import { MapService } from './../../services/map.service';
import { AddressService } from './../../../../shared/services/address/address.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/shared/models/Address';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import * as L from "leaflet";
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-create-edit-address',
  templateUrl: './create-edit-address.component.html',
  styleUrls: ['./create-edit-address.component.scss']
})
export class CreateEditAddressComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;


  action: string;
  Form: FormGroup;
  dialogTitle: string;
  address: Address;
  loading = false;
  dragMarker: L.Marker;

  constructor(
    public matBottomSheetRef: MatBottomSheetRef<CreateEditAddressComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    private addressService: AddressService,
    private mapService: MapService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.action = _data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'اصلاح آدرس';
      this.address = _data.address;
    }
    else {
      this.dialogTitle = 'اضافه کردن به آدرس های عمومی';
      this.address = {} as Address;
    }
    this.Form = this.createForm()
  }

  ngOnInit(): void {
    const drag_markerIcon = {
      icon: L.icon({
        iconSize: [40, 40],
        iconAnchor: [19, 39],
        popupAnchor: [2, -40],
        // specify the path here
        iconUrl:
          "./assets/images/red-marker-ball.ico",
      }),
      draggable: true,
      clickable: true
    };
    this.dragMarker = L.marker([35.729139, 51.300281], drag_markerIcon);
    this.dragMarker.on('dragend', e => {
      if (!this.mobileQuery.matches) {
        this.mapService.moveToView(e.target.getLatLng().lat, e.target.getLatLng().lng)
      }
    });
    this.mapService.map.on('moveend', e => {
      if (this.mobileQuery.matches) {
        const bounds = this.mapService.map.getBounds() as any;
        const latCenter = (bounds._northEast.lat - bounds._southWest.lat)*.75 + bounds._southWest.lat;
        this.dragMarker.setLatLng({
          lat: latCenter,
          lng: e.target.getCenter().lng
        });
      }
      else {
        this.dragMarker.setLatLng(e.target.getCenter());
      }

    });

    this.mapService.markersLayer.addLayer(this.dragMarker);

  }

  ngOnDestroy() {
    this.dragMarker.off('dragend');
    this.mapService.map.off('moveend');
    this.mapService.map.removeLayer(this.dragMarker);
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  createForm(): FormGroup {
    return this._formBuilder.group({
      name: [
        this.address.name,
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      address: [this.address.address],
      latitude: [this.address.latitude],
      longitude: [this.address.longitude]
    });
  }

  createAddress() {
    this.loading = true;
    this.Form.get('latitude').setValue(this.dragMarker.getLatLng().lat);
    this.Form.get('longitude').setValue(this.dragMarker.getLatLng().lng);
    this.addressService.createPublicAddress(this.Form.value).subscribe(res => {
      /*alert here*/
      this.loading = false
      this.matBottomSheetRef.dismiss();
    });
  }

  editAddress() {
    this.loading = true;
    this.Form.get('latitude').setValue(this.dragMarker.getLatLng().lat);
    this.Form.get('longitude').setValue(this.dragMarker.getLatLng().lng);
    this.addressService.editPublicAddress(this.Form.value, this.address.id).subscribe(res => {
      /*alert here*/
      this.loading = false
      this.matBottomSheetRef.dismiss();
    });
  }

  deleteAddress() {
    this.loading = true;
    this.addressService.deletePublicAddress(this.address.id).subscribe(res => {
      /*alert here*/
      this.loading = false
      this.matBottomSheetRef.dismiss();
    });
  }

  cancel() {
    this.matBottomSheetRef.dismiss();
  }

}
