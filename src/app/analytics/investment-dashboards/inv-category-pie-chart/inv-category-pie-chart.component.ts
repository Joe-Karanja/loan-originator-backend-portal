import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inv-category-pie-chart',
  templateUrl: './inv-category-pie-chart.component.html',
  styleUrls: ['./inv-category-pie-chart.component.scss']
})
export class InvCategoryPieChartComponent  {
  @Input() selectedProduct;

  single: any[] = [
    {
      "name": "In Processing",
      "value": 8940000
    },
    {
      "name": "Rejected",
      "value": 5000000
    },
    {
      "name": "Pending Disbursement",
      "value": 7200000
    },
    {
      "name": "Disbursed",
      "value": 6200000
    },
  ];;
  view: any[] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: [ '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
    
  }

  onSelect(event) {
    console.log(event);
  }

}
