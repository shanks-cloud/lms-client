import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-all-inactive-books',
  templateUrl: './view-all-inactive-books.component.html',
  styleUrls: ['./view-all-inactive-books.component.css']
})
export class ViewAllInactiveBooksComponent implements OnInit {

  books = [];
  newBook = false;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  msg: string;
  msgFlag: boolean;
  isbn: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

    this.bookService.getAllBooks().subscribe(
      (data) => {

        console.log("inside getAllBooks method..");
        console.log("inactive data is " + JSON.stringify(data));

        data.forEach((element) => {
          if (element.archiveFlag === true) {
            this.books.push(element);
          }
        });


        this.displayedColumns = ['isbn', 'bookTitle', 'author', 'publisher', 'bookArchiveReason', 'action'];

        console.log("value of this.books... " + JSON.stringify(this.books));

        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      });


    if (history.state.componentOrigin === "app-archive-book") {
      this.isbn = history.state.isbn;
      this.msgFlag = true;
      this.msg = "Book archived successfully";

      setTimeout(() => {
        this.msgFlag = false;
      }, 6000);

    }

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDetails(row: any) {
    console.log(row);
  }

  moveToActiveView(isbn: number) {
    this.bookService.unArchiveBookByIsbn(isbn).subscribe((data) => {

      this.router.navigate(['dashboard'], { skipLocationChange: true }).then(() => {
        this.router.navigate(['home/books/viewAllActiveBooks'], { state: { componentOrigin: "app-view-all-inactive-books", isbn: isbn } });
      });
    })
  }
}
