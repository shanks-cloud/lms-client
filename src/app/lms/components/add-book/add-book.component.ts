import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../model/Book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {

  categories = [];
  submitted: boolean;
  newBook: boolean;
  selectedFile: File;
  previewUrl: string | ArrayBuffer;
  imageType: number;
  errMsg: String;
  isbn: number;
  msg: String;
  foundFlag: boolean;
  showAddForm: boolean;

  minDate = new Date();
  maxDate = new Date();
  endDate = this.maxDate.getUTCDate();
  startDate = this.minDate.setUTCDate(this.endDate - 31);

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.categories = [
      "Computer Science",
      "Philosophy",
      "Medical Science",
      "Art and Living",
      "Astronomy",
      "Aviation"
    ]
  }

  onSubmit(value: Book) {
    this.submitted = true;
    value.bookImageName = this.selectedFile.name;
    value.isbn = this.isbn;

    console.log(JSON.stringify(value));

    this.bookService.addBook(value).subscribe(data => {
      this.router.navigate(['Books/viewAllBooks'], { state: { newBook: true, componentOrigin: "app-add-book", isbn: value.isbn } });
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
      console.log("preview url is " + this.previewUrl);
    }
  }

  onCancel() {
    this.router.navigate(['Books']);
  }


  findIsbn(event: any) {
    console.log("event target value is " + event.target.value);
    this.isbn = event.target.value;

    this.bookService.getBookByIsbn(this.isbn).subscribe((data) => {

      console.log("data is..." + JSON.stringify(data));

      if (data.length > 0) {
        data.forEach((element) => {
          this.isbn = element.isbn;
          this.msg = "ISBN already exists";
          this.foundFlag = true;
        });
      } else {
        this.foundFlag = false;
        this.showAddForm = true;
      }
    });
  }
}
