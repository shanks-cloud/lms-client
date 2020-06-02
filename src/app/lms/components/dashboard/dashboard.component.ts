import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  newArrivalsCount: number;
  newMembersCount: number;
  url: string;
  foundFlag: boolean;

  constructor(private bookService: BookService, private memberService: MemberService) { }

  ngOnInit(): void {

    this.getNewArrivalsCount();

  }

  getNewArrivalsCount() {
    this.bookService.getNewArrivalsCount().subscribe((data) => {
      this.newArrivalsCount = data;
    })
  }


  getNewMembersCount() {
    this.memberService.getNewMembersCount().subscribe((data) => {
      this.newMembersCount = data;
    })

  }

}
