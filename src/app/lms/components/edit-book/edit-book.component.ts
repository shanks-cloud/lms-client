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
  selectedFile: File;
  imageType: number;
  errMsg: String;
  previewUrl: string | ArrayBuffer;

  minDate = new Date();
  maxDate = new Date();
  endDate = this.maxDate.getUTCDate();
  startDate = this.minDate.setUTCDate(this.endDate - 31);

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categories = [
      "Computer Science",
      "Phylosophy",
      "Medical Science",
      "Art and Living"
    ]

    this.isbn = parseInt(this.route.snapshot.paramMap.get("isbn"));
    this.fetchBookByIsbn();

  }

  fetchBookByIsbn() {
    this.bookService.getBookByIsbn(this.isbn).subscribe(data => {
      this.books = data, console.log("inside getBookbyIsbn:" + JSON.stringify(data));
    });
  }

  onUpdate(value: Book) {

    this.edited = true;
    value.isbn = this.isbn;

    this.bookService.updateBook(value, this.isbn).subscribe(data => {
      this.router.navigate(['Books/viewAllBooks'], { state: { editBook: true, componentOrigin: "app-edit-book", isbn: this.isbn } });
    },
      (error: any) => console.log(error)
    );
  }


  fileUpload(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    console.log(this.selectedFile.type);
    this.imageType = this.selectedFile.type.search("image/jpeg");
    console.log("value of image type is.. " + this.imageType);

    if (this.imageType === 0) {
      this.preview();
    } else {
      this.errMsg = "sorry, we do not support this format for file upload..";
    }

  }

  preview() {
    var reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    }
  }












  onCancel() {
    this.router.navigate(['Books/viewAllBooks']);
  }
}
