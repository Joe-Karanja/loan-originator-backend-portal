import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private loggedIn = false;
    private helper = new JwtHelperService();
    public redirectURL = '';
    constructor(
        private _router: Router,
        private http: HttpClient,
        ) {}

    public logout(): void {
        localStorage.removeItem('ussd-token');
        localStorage.clear();
        this._router.navigate(['login']);
        this.loggedIn = false;
    }

    public getRoles(): any {

    }

    public getToken(): any {
        return localStorage.getItem('ussd-token');
    }
    public unauthorizedAccess(error: any): void {
        this.logout();
        this._router.navigate(['/login']);
    }
    public isLoggedIn(): boolean {
         return !this.isExpired();
    }
    public isExpired(): boolean {
        const isExpired = this.helper.isTokenExpired(this.getToken());
        return isExpired;
    }

    public getJWTValue(): any {
        return this.helper.decodeToken(this.getToken());
    }
}
