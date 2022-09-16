import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpBackend } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';

import { GlobalService } from '../shared/global.service';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public jwtHelper: JwtHelperService = new JwtHelperService();
  private _currentUser: any;
  private roles: string[] = [];


  constructor(
    private globalService: GlobalService,
    private handler: HttpBackend,
    private httpClient: HttpClient
  ) {

    this.httpClient = new HttpClient(this.handler);
    this.isAuthenticated();
    const token = this.token;
    if(token) {
      this._currentUser = this.jwtHelper.decodeToken(token)
    }
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
  }

  private static generateHeaders(): { headers: HttpHeaders } {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(environment.client +  ':' + environment.password
            )
        })
    };
  }

  login(username: string, password: string): Observable<any> {
    const model = new HttpParams()
            .set('grant_type', 'password')
            .set('username', username)
            .set('password', password);
    return this.httpClient.post(this.globalService.loginEndpoint, model, AuthService.generateHeaders()).pipe(map(user => {
      if (user && user['access_token']) {
        localStorage.setItem('token', user['access_token']);
        this._currentUser = this.jwtHelper.decodeToken(localStorage.getItem('token'));
        localStorage.setItem("thisUser", this._currentUser['user_name']);
        localStorage.setItem('currentUser', JSON.stringify(user['user_details']));
        localStorage.setItem('refresh_token', user['refresh_token'])
        let roles = user['user_roles'].map(role => {
          return role.name;
        })
        localStorage.setItem('userRoles', JSON.stringify(roles));
        return true
      } else {
        return false;
      }
    }))
  }

  logout(): void {
    this.httpClient.post('http://10.111.210.6:9398/user-management/api/v1/user/logout', { headers: this.getHeaders() }).pipe(map(response => {
    }));
    localStorage.removeItem('token');
    this._currentUser = null;
  }

  get currentUser(): any {
    return this._currentUser;
  }

  get token(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.token;
    if (token) {
        const tokenExpired = this.jwtHelper.isTokenExpired(token);
        if (tokenExpired) {
          this.logout();
          //this._currentUser =  this.jwtHelper.decodeToken(localStorage.getItem('refresh_token'))
        }
    }
  }
}
