import {
  LatLngBoundsExpression,
  MapOptions,
} from './../../../node_modules/@types/leaflet/index.d';
import { Component, AfterViewInit } from '@angular/core';
import { tileLayer, marker } from 'leaflet';
import * as L from 'leaflet';
import { HomeComponent } from "../home/home.component";

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private initMap(): void {
    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Custom Map',
      minZoom: 1,
      maxZoom: 18,
      tileSize: 256, // Adjust based on your image tile size
    });

    this.map = L.map('map', {
      zoom: 1,
      maxZoom: 18,
      minZoom: 1,
      layers: [tileLayer],
    }).fitWorld().setView([44.7866, 20.4489], 8);

    this.map.on('tileerror', (err: Error) => {
      console.error('Tile loading error:', err);
    });
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
