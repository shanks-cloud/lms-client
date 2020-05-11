import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberDTO } from '../model/MemberDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  private registerUrl = 'http://localhost:8080/Register';
  private signInUrl = 'http://localhost:8080/SignIn';

  constructor(private httpService: HttpClient) { }

  register(memberDTO: MemberDTO): Observable<MemberDTO> {
    return this.httpService.post<MemberDTO>(this.registerUrl, memberDTO);
  }
}
