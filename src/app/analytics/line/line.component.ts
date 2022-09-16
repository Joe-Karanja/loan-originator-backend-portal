import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { single, multi } from '../../pages/charts/charts.data';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  encapsulation: ViewEncapsulation.None
})
export class LineComponent {

  public single: any[];
  public multi: any[];

  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Time(months)';
  public showYAxisLabel = true;
  public yAxisLabel = 'Loan Amount(Kes.)';
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  // colorScheme = '#2F3E9E'
  public autoScale = true;

  constructor() {
    // this.colorScheme = '#2F3E9E'
    Object.assign(this, {single, multi})
  }

  onSelect(event) {
    console.log(event);
  }

}
