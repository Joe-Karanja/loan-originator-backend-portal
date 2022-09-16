import { Router } from '@angular/router';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from './global.service';
@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class SystemHttpInterceptor implements HttpInterceptor {
  constructor(private _router: Router, 
     public toastrService: ToastrService,
     private _globalService: GlobalService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('David');
    return next.handle(request.clone({
      setHeaders: {
          'Content-Type': 'application/json',
          'Authorization': this._globalService.getToken()
      }
  })).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // if ( event.body.response_code === 401 ) {
        //   this.toastrService.error('logging Out...', 'Your session has expired');
        //   this._router.navigate(['/home']);
        // }
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.toastrService.error('logged Out', 'Your session has expired');
          this._router.navigate(['/login']);
        }
      }
    });
  }
}
