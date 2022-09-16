import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import More from 'highcharts/highcharts-more';
More(Highcharts);
import Drilldown from 'highcharts/modules/drilldown';
import { HttpService } from 'src/app/shared/services/http.service';
Drilldown(Highcharts);

@Component({
  selector: 'app-product-category-chart',
  templateUrl: './product-category-chart.component.html',
  styleUrls: ['./product-category-chart.component.scss']
})
export class ProductCategoryChartComponent implements OnInit, OnChanges {
  @Input() activeProduct; 
  @Input() clickedChart;
  @ViewChild('container', { read: ElementRef }) container: ElementRef;
  public options: any = {
    chart: {
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      }
    },
    title: {
      text: '<b style="color:darkred; font-size:14px; font-weight: 700">Motor Vehicle Insurance</b>'
    },
    subtitle: {
      text: '<b style="color:blue; font-size:14px; font-weight: 700">Total: </b> '
    },
    plotOptions: {
      pie: {
        innerSize: 100,
        depth: 45
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px"></span><br>',
      pointFormat: '<span style="color:{point.color}">{point.name}</span><b> {point.y}</b> covers<br/>'
    },
    series: [{
      name: 'Motor Vehicle Insurance',
      data: [
        {
          name: 'Commercial',
          y: 400,
          drilldown: 1
        },
        {
          name: 'Private',
          y: 200,
          drilldown: 2
        },
        {
          name: 'PSV',
          y: 300,
          drilldown: 3
        }
      ]
    }],
    drilldown: {
      series: [{
        name: 'Commercial',
        id: 1,
        data: [
          ["Comprehensive Cover", 300],
          ["Third Party", 100],
        ],
        cursor: 'pointer',
        point: {
          events: {
            click: function () {
              const obj = this.name.split(':');
              let link = document.getElementById('david');
              link.style.visibility = 'hidden';
            }
          }
        }
      },
       {
        name: 'Private',
        id: 2,
        data: []
      }]
    }
  };
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
 //   this.options.title.text =  '<b style="color:darkred; font-size:14px; font-weight: 700">Edited</b>'
    this.plotGraph();
  }
  ngOnChanges(changes: SimpleChanges): void {
   // console.log(this.activeProduct[0].p_id);
   this.getCategoryData();
    this.options.title.text =  '<b style="color:darkred; font-size:14px; font-weight: 700"></b> ' + this.clickedChart.name
    this.plotGraph();
  }
  public plotGraph(): any {
    //  Highcharts.chart('container', this.options);
    Highcharts.chart(this.container.nativeElement, this.options
    );
  }
  public getCategoryData(): any {
    const model = {
      "entity": "product",
      "from": "2018-06-10",
      "product_id": String(this.activeProduct[0].p_id),
      "category_id": "2",
      "to": "2020-09-12",
      "transaction_type": "100003"
    };
    this._httpService.post('', model).subscribe(
      result => {
        console.log(result.data);
      },
      error => {
      },
      complete => {
      }
    );
  }
}
