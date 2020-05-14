import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDTO } from '../../model/BookDTO';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  categories = [];
  languages = [];
  edited: boolean;
  isbn: number;
  books = [];
  editBook: boolean;
  bookImageName: String;
  bookArchiveReason: String;
  archiveFlag: boolean;
  msgFlag: boolean;
  bookDTO: BookDTO;
  msg: String;

  minDate = new Date();
  maxDate = new Date();
  endDate = this.maxDate.getUTCDate();
  startDate = this.minDate.setUTCDate(this.endDate - 31);

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.categories = [
      "computerScience",
      "philosophy",
      "medicalScience",
      "artAndLiving",
      "astronomy",
      "aviation"
    ]

    this.languages = [
      "English",
      "French",
      "German",
      "Hindi"
    ];


    this.isbn = parseInt(this.route.snapshot.paramMap.get("isbn"));
    this.fetchBookByIsbn();
  }

  fetchBookByIsbn() {
    this.bookService.getBookByIsbn(this.isbn).subscribe(data => {
      this.books = data;

      console.log("inside getBookbyIsbn:" + JSON.stringify(data));

      data.forEach((element => {
        this.bookImageName = element.bookImageName;
        this.bookArchiveReason = element.bookArchiveReason;
        this.archiveFlag = element.archiveFlag;

        console.log("element value of archive reason is...." + element.archiveFlag);
      }))

    });
  }

  // onUpdate(bookDTO: BookDTO) {

  onUpdate(editForm: NgForm) {

    this.bookDTO = editForm.value;

    this.edited = true;
    this.bookDTO.isbn = this.isbn;

    this.bookDTO.bookImageName = this.bookImageName;
    this.bookDTO.bookArchiveReason = this.bookArchiveReason;
    this.bookDTO.archiveFlag = this.archiveFlag;

    this.bookService.updateBook(this.bookDTO, this.isbn).subscribe(data => {
      // this.router.navigate(['Books/viewAllActiveBooks'], { state: { editBook: true, componentOrigin: "app-edit-book", isbn: this.isbn } });

      this.msg = "Book edited successfully..";
      this.msgFlag = true;

      setTimeout(() => {
        this.msgFlag = false;
        editForm.reset();
      }, 6000);

      setTimeout(() => {

        this.router.navigate(['dashboard'], { skipLocationChange: true }).then(() => {
          this.router.navigate(['home/books/viewAllActiveBooks']);
        });
      }, 3000);

    },
      (error: any) => console.log(error)
    );
  }

  onCancel() {
    this.router.navigate(['home/books/viewAllActiveBooks']);
  }
}