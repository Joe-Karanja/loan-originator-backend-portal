import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { LeafletMapsComponent } from './leaflet-maps/leaflet-maps.component';

export const routes = [
  { path: '', redirectTo: 'googlemaps', pathMatch: 'full'},
  { path: 'googlemaps', component: GoogleMapsComponent, data: { breadcrumb: 'Google Maps' } },
  { path: 'leafletmaps', component: LeafletMapsComponent, data: { breadcrumb: 'Leaflet Maps' } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ 
    LeafletMapsComponent 
  ]
})
export class MapsModule { }
