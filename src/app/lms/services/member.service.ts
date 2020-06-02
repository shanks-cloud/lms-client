import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MemberDTO } from '../model/MemberDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MemberService {

  private memberUrl = 'http://localhost:8080/Member';

  constructor(private httpService: HttpClient) { }

  getNewMembersCount(): Observable<number> {
    return this.httpService.get<number>(this.memberUrl + '/' + 'newMembersCount');
  }

}
