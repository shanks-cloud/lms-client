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

    if (this.authService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Basic ${window.btoa(this.authService.usrname + ":" + this.authService.pswd)}`,
          'Access-Control-Allow-Origin': '*'
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }

  }

}

