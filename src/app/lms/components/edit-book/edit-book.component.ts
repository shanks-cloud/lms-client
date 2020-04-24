import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../model/Book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  categories = [];
  edited: boolean;
  isbn: number;
  books = [];
  editBook: boolean;
  bookImageName: String;

  minDate = new Date();
  maxDate = new Date();
  endDate = this.maxDate.getUTCDate();
  startDate = this.minDate.setUTCDate(this.endDate - 31);

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categories = [
      "Computer Science",
      "Philosophy",
      "Medical Science",
      "Art and Living"
    ]

    this.isbn = parseInt(this.route.snapshot.paramMap.get("isbn"));
    this.fetchBookByIsbn();
  }

  fetchBookByIsbn() {
    this.bookService.getBookByIsbn(this.isbn).subscribe(data => {
      this.books = data;

      console.log("inside getBookbyIsbn:" + JSON.stringify(data));

      data.forEach((element => {
        this.bookImageName = element.bookImageName;
        console.log("book image name inside forEach edit view.." + this.bookImageName);
      }))

    });
  }

  onUpdate(value: Book) {

    this.edited = true;
    value.isbn = this.isbn;

    value.bookImageName = this.bookImageName;

    this.bookService.updateBook(value, this.isbn).subscribe(data => {
      this.router.navigate(['Books/viewAllBooks'], { state: { editBook: true, componentOrigin: "app-edit-book", isbn: this.isbn } });
    },
      (error: any) => console.log(error)
    );
  }

  onCancel() {
    this.router.navigate(['Books/viewAllBooks']);
  }
}