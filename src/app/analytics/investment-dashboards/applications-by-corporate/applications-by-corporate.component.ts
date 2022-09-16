import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-applications-by-corporate',
  templateUrl: './applications-by-corporate.component.html',
  styleUrls: ['./applications-by-corporate.component.scss']
})
export class ApplicationsByCorporateComponent {

  multi: any[];
  view: any[] = [700, 300];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
   this.multi = [ {
    "name": "EABL",
    "series": [
      {
        "name": "March",
        "value": 50000
      },
      {
        "name": "April",
        "value": 100000
      },
      {
        "name": "May",
        "value": 130000
      },
      {
        "name": "June",
        "value": 150000
      },

    ]
  },

  {
    "name": "COCA-COLA",
    "series": [
      {
        "name": "March",
        "value": 40000
      },
      {
        "name": "April",
        "value": 70000
      },
      {
        "name": "May",
        "value": 120000
      },
      {
        "name": "June",
        "value": 110000
      },
    ]
  },
  {
    "name": "Advancys",
    "series": [
      {
        "name": "March",
        "value": 20000
      },
      {
        "name": "April",
        "value": 75000
      },
      {
        "name": "May",
        "value": 120000
      },
      {
        "name": "June",
        "value": 10000
      },
    ]
  },
  {
    "name": "MICROSOFT",
    "series": [
      {
        "name": "March",
        "value": 2000
      },
      {
        "name": "April",
        "value": 4000
      },
      {
        "name": "May",
        "value": 6000
      },
      {
        "name": "June",
        "value": 7000
      },
    ]
  },
  {
    "name": "IBM",
    "series": [
      {
        "name": "March",
        "value": 42900
      },
      {
        "name": "April",
        "value": 90000
      },
      {
        "name": "May",
        "value": 99000
      },
      {
        "name": "June",
        "value": 100000
      },
    ]
  },
]
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
