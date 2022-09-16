import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/shared/services/http.service';


@Component({
  selector: 'app-view-single-tenant',
  templateUrl: './view-single-tenant.component.html',
  styleUrls: ['./view-single-tenant.component.scss']
})
export class ViewSingleTenantComponent implements OnInit {

  public _parameters: any;
  public _id: any;
  public data: any;
  constructor(private _activatedRoute: ActivatedRoute, private _httpService: HttpService) { }

  ngOnInit() {
    this._parameters = this._activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this._id = params['id'];
      }
    });
    this.loadData();
  }
  private loadData(): any {
    this._httpService.get('tenants/tenant/' + this._id ).subscribe(
      result => {
        if (result.response.response_code === this._httpService.errCodes.SUCCESS_CODE) {
          this.data = result.data;
        } else {
        }
      },
      error => {
      },
      complete => {
        console.log(this.data);
      }
    );
  }

}
