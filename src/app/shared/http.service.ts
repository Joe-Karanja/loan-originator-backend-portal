import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';


import { GlobalService } from './global.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  errorMessage: string;
  len: number;
  pendingUsers: any[];
  stagedArray: any[] = [];

  constructor(
    private _authService: AuthService,
    private _globalService: GlobalService,
    private httpClient: HttpClient
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this._authService.token,
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'no-sniff',
      'X-Frame-Options': 'deny'
    });
  }
  
  private getHeadersWithoutBearer(): HttpHeaders {
    return new HttpHeaders({
        'Content-Type': 'application/json'
    });
  }

  //returns error message
  loadErrorMessage(): string {
    this.errorMessage = 'This action is forbidden, your current profile lacks the relevant role';
    return this.errorMessage;
  }

  public post(endpoint: string, model: any): any {
    return this.httpClient.post(this._globalService.universalEndpoint + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public postDb(model: any): any {
    return this.httpClient.post(this._globalService.dbAPIEndpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public postStored(model: any): any {
    return this.httpClient.post(this._globalService.storedEndpoint, model, {headers: this.getHeaders()}).
    pipe(map(response => {
      response = response;
      return response;
    }))
  }

  public postVariables(endpoint: string, model: any): any {
    return this.httpClient.post(this._globalService.managerEndpoint + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public get(endpoint: string): any {
    return this.httpClient.get(this._globalService.universalEndpoint + endpoint, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public getData(endpoint: string, model: any, body: any): any {
    const params = new HttpParams()
      .set('page', model.page.toString())
      .set('size', model.size.toString())
    return this.httpClient.post(this._globalService.auditEndpoint + endpoint, body, { params, headers: this.getHeaders() }).pipe(map(response => {
      response = response;
      return response;
    }))
  }

  public postAudit(endpoint: string, model: any): any {
    return this.httpClient.post(this._globalService.auditEndpoint + endpoint, model, { headers: this.getHeaders() }
    ).pipe(map(response => {
      // console.log(response)
        response = response;
        return response;
    }));
  }

  public retrieveData(endPoint: string, model: any): any {
    const params = new HttpParams()
      .set('page', model.page.toString())
      .set('size', model.size.toString())
    return this.httpClient.get(this._globalService.universalEndpoint + endPoint, { params, headers: this.getHeaders() }).pipe(map(response => {
      response = response;
      return response;
    }))
  }

  public loadNotifications(): void {
    this.get('api/v1/workflow/get-user-pending-actions').subscribe(res => {
      if (res['status'] === 200) {
        this.len = res['data'].length;
        this.pendingUsers = res['data'];
        let userContainer;
        this.pendingUsers.map(item => {
          userContainer = JSON.parse(JSON.parse(item['data']));
          userContainer['id'] = item['id'];
          userContainer['createdBy'] = item['createdBy'];
          userContainer['createdOn'] = item['createdOn'];
          userContainer['workflowName'] = item['workflowName'];
          this.stagedArray.push(userContainer);
        });
        console.log('user details: ', this.stagedArray);
      }
    })
  }

  public retrieveChannels(): any {
    let model = {
      query: "GET_CHANNELS_QUERY",
      data: {}
    };
    this.postDb(model)
  }
}
