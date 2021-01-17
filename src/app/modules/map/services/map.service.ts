import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public map: L.Map;
  public markersLayer;
  constructor() { }

  moveToView(lat: number, lng: number) {
    this.map.panTo(new L.LatLng(lat, lng));
  }
}
