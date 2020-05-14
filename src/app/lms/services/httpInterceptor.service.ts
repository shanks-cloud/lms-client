import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log("inside interceptor method...");

    if (this.authService.isUserLoggedIn && req.url.indexOf('basicauth') === -1) {

      console.log("inside interceptor if method...");

      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Basic ${window.btoa(this.authService.eId + ":" + this.authService.pswd)}`,
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}