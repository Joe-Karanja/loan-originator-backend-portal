import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public universalEndpoint: string;
  public loginEndpoint: string;
  public managerEndpoint: string;
  public dbAPIEndpoint: string;
  public auditEndpoint: string;
  public storedEndpoint: string;

  constructor(
  ) {
    this.auditEndpoint = environment.auditEndpoint;
    this.dbAPIEndpoint = environment.dbAPIEndpoint;
    
    //dev endpoint
    this.loginEndpoint = environment.loginEndpoint;
    //SIT endpoint
    //this.loginEndpoint = 'http://10.111.210.70:8990/oauth/token';

    this.managerEndpoint = environment.managerEndpoint;
    this.storedEndpoint = environment.storedEndpoint;
    
    //dev
    this.universalEndpoint = environment.universalEndpoint;
    //this.universalEndpoint = 'https://da1380aa93bbea.localhost.run/';
    //SIT
    //this.universalEndpoint = 'http://10.111.210.70:8990/';
  }

  public enumerateDaysBetweenDates(startDate: any, endDate: any): any {
    startDate = moment(startDate);
    endDate = moment(endDate);
    const now = startDate;
    const dates = [];
    while (now.isBefore(endDate) || now.isSame(endDate)) {
      dates.push(now.format('YYYY-MM-DD'));
      now.add(1, 'days');
    }
    return dates;
  };

  public formatChartData(value): any {
    if (value >= 1000000000 || value <= -1000000000 ) {
      return Number(value) / 1e9 + 'B';
    } else if (value >= 1000000 || value <= -1000000) {
      return Number(value) / 1e6 + 'M';
    } else  if (value >= 1000 || value <= -1000) {
      return Number(value) / 1e3 + 'K';
    }
    return value;
  }

  public getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }
}
