import { Component, OnInit } from '@angular/core';
// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {

  constructor() { }

  ngOnInit() {
    // Set theme
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.PieChart);
    // Add data
    chart.data = [{
      "country": "Option A",
      "litres": 501
    }, {
      "country": "Option B",
      "litres": 301
    }, {
      "country": "Option C",
      "litres": 201
    }, {
      "country": "Option D",
      "litres": 165
    }, {
      "country": "Option E",
      "litres": 139
    }, {
      "country": "Option F",
      "litres": 128
    }, {
      "country": "Option G",
      "litres": 99
    }];

    // Add and configure Series
    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
  }

}
