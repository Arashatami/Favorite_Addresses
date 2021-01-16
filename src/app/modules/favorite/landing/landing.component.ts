import { AddressService } from './../../../shared/services/address/address.service';
import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer } from 'leaflet';
import * as L from "leaflet";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private addressService: AddressService
  ) { }
  map;
  markersLayer = new L.LayerGroup();
  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(35.729139, 51.300281)
  };

  ngOnInit(): void {
  }

  onMapReady(map) {
    this.clear();

    this.markersLayer.addTo(map);

    const markerIcon = {
      icon: L.icon({
        iconSize: [40, 40],
        iconAnchor: [19, 39],
        popupAnchor: [2, -40],
        // specify the path here
        iconUrl:
          "./assets/images/marker-ball.ico",
      })
    };

    // Define an icon called cssIcon
    const animatedCircleIcon = {
      icon: L.divIcon({
        className: "css-icon",
        html: '<div class="gps_ring"></div>',
        iconSize: [22, 22]
      })
    };

    this.addressService.publicAddresses.subscribe(res => {
      this.clear();
      res.forEach(loc => {
        this.markersLayer.addLayer(L.marker([loc.latitude, loc.longitude], markerIcon));
        this.markersLayer.addLayer(L.marker([loc.latitude, loc.longitude], animatedCircleIcon));
      })
    });
  }

  clear() {
    this.markersLayer.clearLayers();
  }

}
