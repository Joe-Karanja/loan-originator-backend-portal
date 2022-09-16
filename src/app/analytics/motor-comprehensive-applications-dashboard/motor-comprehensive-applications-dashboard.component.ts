import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-motor-comprehensive-applications-dashboard',
  templateUrl: './motor-comprehensive-applications-dashboard.component.html',
  styleUrls: ['./motor-comprehensive-applications-dashboard.component.scss']
})
export class MotorComprehensiveApplicationsDashboardComponent implements OnInit {
  lapplications;
  lapplicationsBgColor;
  public  data: any = [
    {
     name: 'Motor 3rd Party', count: 30,     
      status: {
        fully_paid: 16,
        pending_payment: 14
      } 
    },
    {
       name: 'Motor Comprehensive', count: 30,     
      status: {
        fully_paid: 16,
        pending_payment: 14
      } 
    }
  ];
  public applications = [{ name: 'All Applications', value: 0 }];
  public applicationsBgColor = { domain: ['#606060'] };

  public paidApplications = [{ name: 'Pending Payment', value: 0 }];
  public paidApplicationsBgColor = { domain: ['#2F3E9E'] };

  public unpaidApplications = [{ name: 'Fully Paid', value: 0 }];
  public unpaidApplicationsBgColor = { domain: ['#378D3B'] };


  constructor() { }

  ngOnInit() {
    this.applications[0]['value'] = this.data[0].count;
    this.paidApplications[0]['value'] = this.data[0].status.fully_paid;
    this.unpaidApplications[0]['value'] = this.data[0].status.pending_payment;
  }

  public infoLabelFormat(c): string {
    switch (c.data.name) {
      case 'All Applications':
        return `<i class="fa fa-shopping-cart mr-2"></i>${c.label}`;
      case 'Pending Payment':
        return `<i class="fa fa-car mr-2"></i>${c.label}`;
      case 'Fully Paid':
        return `<i class="fa fa-stethoscope mr-2"></i>${c.label}`;
          default:
        return c.label;
    }
  }

  public infoValueFormat(c): string {
    switch (c.data.extra ? c.data.extra.format : '') {
      case 'currency':
        return `\$${Math.round(c.value).toLocaleString()}`;
      case 'percent':
        return `${Math.round(c.value * 100)}%`;
      default:
        return c.value.toLocaleString();
    }
  }

  onSelect($event): void{}
}
