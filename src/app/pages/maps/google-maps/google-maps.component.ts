import { HttpService } from 'src/app/shared/services/http.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  encapsulation: ViewEncapsulation.None
})
export class GoogleMapsComponent implements OnInit {
   lat: number = -12.9772898;
   lng: number = 28.5619309;
   zoom = 6;
   markers: any;
   pests: any;
 constructor(private httpService: HttpService) {
 }
 loadPests(): void {
  this.httpService.get('pims/pest-country').subscribe(
    result => {
      if (result.response.code === 200) {
        this.pests = result.data.map((rec => {
          return rec;
        }));
      } else {
      }
    },
    error => {
    },
    complete => {
     this.loadMarkers();
    }
  );
 }
 loadMarkers(): void {
  this.httpService.get('pims/pest-distribution').subscribe(
    result => {
      if (result.response.code === 200) {
        this.markers = result.data.map((rec => {
          rec.pest_local_name = this.getPestLocalName(rec.pest_country_id);
          return rec;
        }));
      } else {
      }
    },
    error => {
    },
    complete => {
      console.log(this.markers);
    }
  );
 }
  ngOnInit(): void {
  this.loadPests();
  }
  public getPestLocalName(id: number): string {
    const model = this.pests.filter((rec => {
      return Number(rec.id) === Number(id);
    }));
    return model[0] ? model[0].local_name : 'Not set';
  }
}
