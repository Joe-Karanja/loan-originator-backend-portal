import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataRetrievalService {

  public channels: any;

  constructor(
    private _httpService: HttpService
  ) { }
  
  public getChannels(model): any {
    this._httpService.postDb(model).subscribe(res => {
      if(res['status'] === 200) {
        this.channels = res["data"];
      }
      console.log("channels retrieved? ", this.channels);
      return this.channels;
    })
  }
}
