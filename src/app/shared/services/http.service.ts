import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { isThisISOWeek } from 'date-fns';
@Injectable(
    {
        providedIn: 'root',
    }
)
export class HttpService {
    public model = {
        "username": "ronald.langat",
        "entity": "",
        "where_clause": "",
        "where_value": "",
        "transaction_type": "10071"
    };
    public errCodes: any = {
        SUCCESS_CODE: '00',
        FAILED_CODE: '01',
        RECORD_NOT_FOUND: '04',
        RECORD_EXISTS: '05',
        VALIDATION_FAILURE: '11',
        AUTHORIZATION_FAILED_CODE: '55',
        PERMISSION_ERROR_CODE: '56'
    };
    _username: any;
    constructor(
        private http: HttpClient,
        private _globalService: GlobalService,
        private _authService: AuthService,
    ) { }
    private getHeaders(): any {
        // const headers = new Headers({ 'Content-Type': 'application/json' });
        // const options = new RequestOptions({ headers });
        //  return options;
        return new HttpHeaders({
            'Content-Type': 'application/json'
            //   'Authorization': this._globalService.getToken()
        });
    }
    private getFormHeaders(): any {

        return new HttpHeaders({
            'Content-Type': 'multipart/form-data'
        });
    }
    private getHeadersWithoutBearer(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json'
        });
    }
    public login(endpoint: any, model: any): any {
        return this.http.post(this._globalService.apiHost + endpoint, model, { headers: this.getHeaders() });
        // return this.http.post(this._globalService.apiHost + endpoint, model, headers }
        // ).pipe(map(response => {
        //     response = response;
        //     return response;
        // }));
    }
    public post(endpoint: string, model: any): any {
        return this.http.post(this._globalService.apiHost + endpoint, model, this.getHeaders()
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public patch(endpoint: string, model: any): any {
        return this.http.patch(this._globalService.apiHost + endpoint, model, { headers: this.getHeaders() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public put(endpoint: string, model: any): any {
        return this.http.put(this._globalService.apiHost + endpoint, model, { headers: this.getHeaders() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public get(endpoint: string, headerParams?: any): any {
        let params = new HttpParams();
        // params = params.append('page', '0');
        // params = params.append('size', '1000');
        return this.http.get(endpoint,
            {
                headers: this.getHeaders(), params: params
            }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public postb4(endpoint: string, model: any): any {
        return this.http.post(endpoint, model, this.getHeaders()
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public delete(endpoint: string): any {
        return this.http.delete(this._globalService.apiHost + endpoint, { headers: this.getHeaders() }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public getAdvanced(endpoint: string): any {

    }
    getFromJson(endpoint: string): any {
        return this.http.get(endpoint);
    }

    public handleErrorsFromServer(errorsObj: any) {
        const errorMessages = [];
        Object.entries(errorsObj).forEach(
            ([key, value]) => // console.log(key, value)
                errorMessages.push(value)
        );
        return errorMessages;
    }
    public format(date: NgbDateStruct, format: string): string {
        if (!date) { return ''; }
        const mdt = moment([date.year, date.month - 1, date.day]);
        if (!mdt.isValid()) { return ''; }
        return mdt.format(format);
    }
    public Username() {
        return JSON.parse(localStorage.getItem('user_details'));
    }

    public scoresPost(endpoint: string, model: any): any {
        return this.http.post(this._globalService.loanScoringHost + endpoint, model, this.getHeaders()
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public scoresFormRequestPost(endpoint: string, model: any): any {
        return this.http.post(this._globalService.loanScoringHost + endpoint, model, this.getFormHeaders()
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
    public scoresGet(endpoint: string): any {

        console.log('endpoint');
        console.log(endpoint);

        let params = new HttpParams();
        params = params.append('page', '0');
        params = params.append('size', '50');

        return this.http.get(this._globalService.loanScoringHost + endpoint, { headers: this.getHeaders(), params }
        ).pipe(map(response => {
            response = response;
            return response;
        }));
    }
}
