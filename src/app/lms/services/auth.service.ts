import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_PATH: string = 'http://localhost:8080/home';
  USER_NAME_SESSION_ATTRIBUTE_NAME: string = 'authenticatedUser';

  usrname: string;
  pswd: string;

  constructor(private http: HttpClient) { }

  authenticationService(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': this.createBasicAuthToken(username, password)
      })
    }


    return this.http.get(this.BASE_PATH + '/' + "basicauth", httpOptions).pipe(map((resp) => {
      this.usrname = username;
      this.pswd = password;
      this.registerSuccessfulLogin(username, password);
      console.log("response is " + resp);
    }));

  }


  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.usrname = null;
    this.pswd = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return '';
    return user;
  }
}