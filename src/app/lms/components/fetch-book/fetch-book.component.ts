import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fetch-book',
  templateUrl: './fetch-book.component.html',
  styleUrls: ['./fetch-book.component.css']
})
export class FetchBookComponent implements OnInit {

  constructor(private bookService: BookService, private router: Router) { }

  msg: String;
  foundFlag: boolean;
  showAddForm: boolean;
  isbn: any;

  ngOnInit(): void {
    this.showAddForm = false;
  }

  onFetch(value: any) {

    this.bookService.getBookByIsbn(value.isbn).subscribe((data) => {

      console.log("data is..." + JSON.stringify(data));

      this.isbn = value.isbn;

      console.log("value inside this.isbn is " + this.isbn);

      if (data.length > 0) {
        data.forEach((element) => {
          this.isbn = element.isbn;
          this.msg = "ISBN already exists";
          this.foundFlag = true;
        });
      } else {
        this.foundFlag = false;
        this.showAddForm = true;

        //this.router.navigate(['Books/addBook'], { state: { foundFlag: true, isbn: value.isbn } });
      }
    });
  }

  onClick() {
    this.router.navigate(['Books']);
  }

}