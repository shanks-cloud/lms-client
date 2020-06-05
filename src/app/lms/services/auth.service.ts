import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserDTO } from '../model/UserDTO';
import { MemberDTO } from '../model/MemberDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  BASE_PATH: string = 'http://localhost:8080/home';
  memberUrl: string = 'http://localhost:8080/Member';

  USER_NAME_SESSION_ATTRIBUTE_NAME: string = 'authenticatedUser';

  eId: string;
  pswd: string;
  token: string;

  headers: HttpHeaders;

  constructor(private http: HttpClient) {

  }

  /*******************************************************************************/
  /********************************** Login Service ******************************/
  /*******************************************************************************/

  authenticationService(userDTO: UserDTO) {

    console.log("inside authenticationService method..");

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    this.headers = this.headers.append('Content-Type', 'application/json');
    //this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    this.headers = this.headers.append('Access-Control-Allow-Credentials', 'true');

    console.log("header before token generation is  " + JSON.stringify(this.headers));

    this.token = this.createBasicAuthToken(userDTO.emailId, userDTO.password);
    console.log("token is " + this.token);

    this.headers = this.headers.append('Authorization', this.token);

    console.log("header is " + JSON.stringify(this.headers));

    return this.http.post(this.BASE_PATH + '/' + "basicauth", userDTO, { headers: this.headers }).pipe(map((resp) => {
      this.eId = userDTO.emailId;
      this.pswd = userDTO.password;
      this.successfulLogin(userDTO.emailId);
      console.log("response is " + resp);
    }));
  }


  createBasicAuthToken(emailId: string, password: string) {
    return 'Basic ' + window.btoa(emailId + ":" + password);
  }

  successfulLogin(emailId: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, emailId);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.eId = null;
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

  /*******************************************************************************/
  /************************** Registration Service *******************************/
  /*******************************************************************************/

  register(memberDTO: MemberDTO) {

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    this.headers = this.headers.append('Content-Type', 'application/json');
    //this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    this.headers = this.headers.append('Access-Control-Allow-Credentials', 'true');

    console.log("header before token generation is  " + JSON.stringify(this.headers));

    this.token = this.createBasicAuthToken(memberDTO.emailId, memberDTO.password);
    console.log("token is " + this.token);

    this.headers = this.headers.append('Authorization', this.token);

    console.log("header is " + JSON.stringify(this.headers));

    return this.http.post(this.memberUrl + '/' + 'Register', memberDTO, { headers: this.headers }).pipe(map((resp) => {
      this.eId = memberDTO.emailId;
      this.pswd = memberDTO.password;
      this.successfulRegistration(memberDTO.emailId);
      console.log("response is " + resp);
    }));
  }

  successfulRegistration(emailId: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, emailId);
  }

  /************************************************************************************/
  /************************** check email for duplicate *******************************/
  /************************************************************************************/

  fetchEmailId(userDTO: UserDTO): Observable<UserDTO> {

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Accept', 'application/json');
    this.headers = this.headers.append('Content-Type', 'application/json');
    //this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.append('Access-Control-Allow-Origin', 'http://localhost:4200');
    this.headers = this.headers.append('Access-Control-Allow-Credentials', 'true');

    console.log("header before token generation is  " + JSON.stringify(this.headers));

    this.token = 'Basic ' + window.btoa(userDTO.emailId + ":" + userDTO.password);

    console.log("token is " + this.token);

    this.headers = this.headers.append('Authorization', this.token);

    console.log("header is " + JSON.stringify(this.headers));

    return this.http.get<UserDTO>(this.memberUrl + '/' + 'fetchMember' + '/' + userDTO.emailId, { headers: this.headers });

  }



}