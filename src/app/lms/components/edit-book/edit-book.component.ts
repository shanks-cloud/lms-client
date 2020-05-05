import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookDTO } from '../../model/BookDTO';

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

  onUpdate(bookDTO: BookDTO) {

    this.edited = true;
    bookDTO.isbn = this.isbn;

    bookDTO.bookImageName = this.bookImageName;
    bookDTO.bookArchiveReason = this.bookArchiveReason;
    bookDTO.archiveFlag = this.archiveFlag;

    this.bookService.updateBook(bookDTO, this.isbn).subscribe(data => {
      this.router.navigate(['Books/viewAllActiveBooks'], { state: { editBook: true, componentOrigin: "app-edit-book", isbn: this.isbn } });

      setTimeout(function () {
        location.reload();
      }, 3000);

    },
      (error: any) => console.log(error)
    );
  }

  onCancel() {
    this.router.navigate(['Books/viewAllActiveBooks']);
  }
}