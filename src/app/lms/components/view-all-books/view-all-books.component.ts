import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-all-books',
  templateUrl: './view-all-books.component.html',
  styleUrls: ['./view-all-books.component.css']
})

export class ViewAllBooksComponent implements OnInit {

  books = [];
  newBook=false;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;
  msg: string;
  isbn: string;
  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

      this.bookService.getAllBooks().subscribe(
        ( data ) => {
          
        console.log("inside getAllBooks method..");
        console.log("data is " + JSON.stringify(data));
        
        this.books = data;
        
        this.displayedColumns = ['isbn', 'bookTitle', 'author', 'publisher', 'action'];
        this.dataSource = new MatTableDataSource(this.books);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator= this.paginator;

        if ((history.state.componentOrigin === "app-add-book") && (history.state.newBook === true)) {
           this.isbn=history.state.isbn;  
           this.msg = "Book added to the collection successfully..";
        }    


      });

  }

  onClick() {
    this.router.navigate(['Books']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDetails(row) {
    console.log(row);
  }

}
