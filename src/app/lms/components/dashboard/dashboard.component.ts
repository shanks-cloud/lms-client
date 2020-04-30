import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  newArrivalsCount: number;

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
