import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  newArrivalsCount: number;
  url: string;
  foundFlag: boolean;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {

    this.getNewArrivalsCount();

  }

  getNewArrivalsCount() {
    this.bookService.getNewArrivalsCount().subscribe((data) => {
      this.newArrivalsCount = data;
    })
  }

}
