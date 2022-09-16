import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-general-dashboard',
  templateUrl: './general-dashboard.component.html',
  styleUrls: ['./general-dashboard.component.scss']
})
export class GeneralDashboardComponent implements OnInit {
  public isLoaded: boolean = false;
  public dataSet: any;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.loadData();
  }
  private loadData(): any {
    this.isLoaded = false;
    const model = {
      "username": localStorage.getItem('username'),
      "entity": "product",
      "from": "2018-12-12",
      "to": "2019-12-12",
      "transaction_type": "100002"
    };
    this._httpService.post('', model).subscribe(
      result => {
        //console.log(result.data);
        this.dataSet = result.data;
        // console.log(this.dataSet);
      },
      error => {
      },
      complete => {
        this.isLoaded = true;
      }
    );
  }
}
