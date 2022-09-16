import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium-per-product-value',
  templateUrl: './premium-per-product-value.component.html',
  styleUrls: ['./premium-per-product-value.component.scss']
})
export class PremiumPerProductValueComponent implements OnInit {
  @Input() premiumPerProduct: any;
  public activeProduct: any;
  public clickedChart: any;
  public data;
  public motor = [{ name: 'Motor Vehicle Insurance', value: 500000, extra: 300 }];
  public motorBgColor = { domain: ['#2a6592'] };

  public travel = [{ name: 'Travel Insurance', value: 300000, extra: 250 }];
  public travelBgColor = { domain: ['#e67300'] };

  public personal = [{ name: 'Personal Accident Cover', value: 3500000, extra: 340 }];
  public personalBgColor = { domain: ['#ff751a'] };

  public life = [{ name: 'Health Insurance', value: 2000000, extra: 400 }];
  public lifeBgColor = { domain: ['#cc33ff'] };


  constructor(private _httpService: HttpService, private router: Router) { }
  ngOnInit() {
    // Travel
    //  this.travel[0].value = this.premiumPerProduct.travel[0].total;
    //this.travel[0].extra = this.premiumPerProduct.travel[0].counts;
    //
    this.motor[0].value = this.premiumPerProduct.motor_vehichle[0].total;
    this.motor[0].extra = this.premiumPerProduct.motor_vehichle[0].counts;

    // PA
    this.personal[0].value = this.premiumPerProduct.personal_accident[0].total;
    this.personal[0].extra = this.premiumPerProduct.personal_accident[0].counts;


  }

  private loadApplications(): any {
    const model = {
      "transaction_type": "50001"
    };
    this._httpService.post('', model).subscribe(
      result => {
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
      case 'Motor Vehicle Insurance':
        return `<small>${c.data.extra}</small>&nbsp; | ${c.label}`;
      case 'Life Insurance':
        return `<small>${c.data.extra}</small>&nbsp; | ${c.label}`;
      //  return `<i class="fa fa-check mr-2"></i>${c.label}`;
      case 'Travel Insurance':
        return `<small>${c.data.extra}</small>&nbsp; | ${c.label}`;
      //  return `<i class="fa fa-times-circle mr-2"></i>${c.label}`;
      case 'Personal Accident Cover':
        return `<small>${c.data.extra}</small>&nbsp; | ${c.label}`;
      //  return `<i class="fa fa-times-circle mr-2"></i>${c.label}`;
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
        return `${c.value.toLocaleString()} Ksh.`;
    }
  }

  public onSelect(event: any): void {
   console.log(event);
   switch (event.name) {
     case 'Motor Vehicle Insurance':
       this.activeProduct = this.premiumPerProduct.motor_vehichle;
       this.clickedChart = event;
       break;
       case 'Personal Accident Cover':
       this.activeProduct = this.premiumPerProduct.personal_accident;
       this.clickedChart = event;
       break;
   
     default:
        this.activeProduct = [];
       break;
   }
  }

  goToLink(url: string): void {
    this.router.navigateByUrl(url);
  }

}
