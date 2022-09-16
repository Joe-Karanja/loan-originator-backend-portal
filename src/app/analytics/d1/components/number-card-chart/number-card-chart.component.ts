import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-number-card-chart',
  templateUrl: './number-card-chart.component.html',
  styleUrls: ['./number-card-chart.component.scss']
})
export class NumberCardChartComponent implements OnInit {
  public applicationsData;
  public applicationDataWithStatus;
  public selectedApplication = {
    product_name: 'All Covers',
    product_id: 0,
    counts: 0
  };
  public approvedCount = 0;
  public pendingCount = 0;

  public applications = [{ name: 'All Applications', value: 0 }];
  public applicationsBgColor = { domain: ['#606060'] };

  public mvapplications = [{ name: 'Motor Vehicle', value: 0 }];
  public mvapplicationsBgColor = { domain: ['#2F3E9E'] };

  public happlications = [{ name: 'Health Cover', value: 0 }];
  public happlicationsBgColor = { domain: ['#378D3B'] };

  public lapplications = [{ name: 'Life Insurance', value: 0 }];
  public lapplicationsBgColor = { domain: ['#0096A6'] };

  constructor(private _httpService: HttpService, private router: Router) { }
  ngOnInit() {
    this.loadApplications();
    this.loadApplicationStatus();
  }

  private loadApplications(): any {
    const model = {
      "transaction_type": "50001"
    };
    this._httpService.post('', model).subscribe(
      result => {
        if (result.result.response_code == "00") {
          this.applicationsData = result.result.count;
          this.mvapplications[0]['value'] = this.applicationsData[1]['counts'];
          this.happlications[0]['value'] = this.applicationsData[0]['counts'];
          this.lapplications[0]['value'] = this.applicationsData[2]['counts'];
          this.applications[0]['value'] = Number(this.applicationsData[1]['counts']) +
            Number(this.applicationsData[0]['counts']) + Number(this.applicationsData[2]['counts']);

        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  public infoLabelFormat(c): string {
    switch (c.data.name) {
      case 'All Applications':
        return `<i class="fa fa-shopping-cart mr-2"></i>${c.label}`;
      case 'Motor Vehicle':
        return `<i class="fa fa-car mr-2"></i>${c.label}`;
      case 'Health Cover':
        return `<i class="fa fa-stethoscope mr-2"></i>${c.label}`;
      case 'Life Insurance':
        return `<i class="fa fa-ambulance mr-2"></i>${c.label}`;
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

  public onSelect(event: any): void {
    switch (event.name) {
      case 'All Applications':
        this.selectedApplication.product_id = 0;
        this.selectedApplication.product_name = 'All Covers';
        this.getCount(0);
        break;
      case 'Motor Vehicle':
        this.selectedApplication = this.applicationsData[1];
        this.getCount(3);
        break;
      case 'Health Cover':
        this.selectedApplication = this.applicationsData[0];
        this.getCount(2);
        break;
      case 'Life Insurance':
        this.selectedApplication = this.applicationsData[2];
        this.getCount(5);
        break;
      default:
        break;
    }
    
  }
  private loadApplicationStatus(): any {
    const model = {
      "transaction_type": "50003"
    };
    this._httpService.post('', model).subscribe(
      result => {
        if (result.result.response_code == "00") {
          this.applicationDataWithStatus = result.result.count;
        }
      },
      error => {
      },
      complete => {
      }
    );
  }
  private getCount(id: any): any {
    console.log(id);
    const countModel = this.applicationDataWithStatus.filter((rec) => {
      return String(rec.product_id) === String(id);
    });
    if (countModel && countModel != undefined && countModel.length > 0) {
      this.approvedCount = countModel[0].approvedCount;
      this.pendingCount = countModel[0].pendingCount;
    } else {
      // All
      this.approvedCount = this.applicationDataWithStatus.reduce((acc, currValue, currIndex, array) => {
        return acc + Number(currValue.approvedCount);
      }, 0);
      this.pendingCount = this.applicationDataWithStatus.reduce((acc, currValue, currIndex, array) => {
        return acc + Number(currValue.pendingCount);
      }, 0);

    }

  }

  goToLink(url: string): void {
    this.router.navigateByUrl(url);
  }

}
