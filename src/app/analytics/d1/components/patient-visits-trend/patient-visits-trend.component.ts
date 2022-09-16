import { GlobalService } from './../../../../shared/services/global.service';
import { HttpService } from './../../../../shared/services/http.service';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-patient-visits-trend',
  templateUrl: './patient-visits-trend.component.html',
  styleUrls: ['./patient-visits-trend.component.scss']
})
export class PatientVisitsTrendComponent implements OnInit, OnChanges {
  @Input() selectedApplication;
  public visitDates: any = [];
  public isLoaded = false;
  graphData: any[] = [];
  view: any[] = [630, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Applications';

  colorScheme = {
    domain: ['#5AA454']
  };

  constructor(private _httpService: HttpService, private _globalService: GlobalService) {
  }
  ngOnInit(): void {
    this.loadData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }
  loadData(): void {
    const model = {
      "from_date":"2019-08-29",
      "end_date":"2019-09-10",
      "transaction_type": "50004",
      "product_id": Number(this.selectedApplication.product_id),
  }
    this._httpService.post('', model).subscribe(
      result => {
       this.graphData =  result.list;
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }
  onSelect(event) {
    console.log(event);
  }
}
