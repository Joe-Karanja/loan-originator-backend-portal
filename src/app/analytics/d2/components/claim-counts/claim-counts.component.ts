import { HttpService } from 'src/app/shared/services/http.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-counts',
  templateUrl: './claim-counts.component.html',
  styleUrls: ['./claim-counts.component.scss']
})
export class ClaimCountsComponent implements OnInit {
  public data;
  public approvedCount = 33;
  public pendingCount = 4;
  // @Input()
   dashData: any;

  public applications = [{ name: 'All Applications', value: 90000 }];
  public applicationsBgColor = { domain: ['#2a6592'] };

  public approved = [{ name: 'Approved Applications', value: 2000000 }];
  public approvedBgColor = { domain: ['#669900'] };

  public rejected = [{ name: 'Rejected Applications', value: 300000 }];
  public rejectedBgColor = { domain: ['#e60000'] };

  public disbursed = [{ name: 'Disbursed Loans', value: 350000 }];
  public disbursedBgColor = { domain: ['#00b300'] };



  constructor(private _httpService: HttpService, private router: Router) {
    // this.loadDataSummary()
   }
  ngOnInit() {
    // /console.log(this.dashData);
   
  }
 

  private loadApplications(): any {
    const model = {
      "transaction_type": "50001"
    };
    this._httpService.post('', model).subscribe(
      result => {
        console.log(result);
        
        if (result.result.response_code == "00") {
          // this.applicationsData = result.result.count;

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
      case 'Approved Applications':
        return `<i class="fa fa-check mr-2"></i>${c.label}`;
      case 'Rejected Applications':
        return `<i class="fa fa-times-circle mr-2"></i>${c.label}`;
      case 'Disbursed Loans':
        return `<i class="fa fa-times-circle mr-2"></i>${c.label}`;
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
    this.router.navigate(['loans/applications'])
  }

  goToLink(url: string): void {
    this.router.navigateByUrl(url);
  }

}
