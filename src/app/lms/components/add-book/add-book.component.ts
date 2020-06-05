import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookDTO } from '../../model/BookDTO';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})

export class AddBookComponent implements OnInit {

  categories = [];
  languages = [];

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

  dispIsbn: number;

  minDate = new Date();
  maxDate = new Date();
  endDate = this.maxDate.getUTCDate();
  startDate = this.minDate.setUTCDate(this.endDate - 31);

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.categories = [
      "computerScience",
      "philosophy",
      "medicalScience",
      "artAndLiving",
      "astronomy",
      "aviation"
    ];

    this.languages = [
      "English",
      "French",
      "German",
      "Hindi"
    ];

  }

  onSubmit(bookDTO: BookDTO) {

    this.submitted = true;
    bookDTO.bookImageName = this.selectedFile.name;
    bookDTO.isbn = this.isbn;
    bookDTO.bookArchiveReason = "";
    bookDTO.archiveFlag = false;
    bookDTO.bookCopies = 0;


    console.log(JSON.stringify(bookDTO));

    this.bookService.addBook(bookDTO).subscribe(data => {

      this.router.navigate(['dashboard'], { skipLocationChange: true }).then(() => {
        this.router.navigate(['home/books/viewAllActiveBooks'], { state: { newBook: true, componentOrigin: "app-add-book", isbn: bookDTO.isbn } });
      });

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
      this.errMsg = "sorry, at the moment we only support .jpg for file upload..";
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
    this.router.navigate(['home/books/viewAllActiveBooks']);
  }


  findIsbn(event: any, userForm: NgForm) {
    console.log("event target value is " + event.target.value);

    this.isbn = event.target.value;

    this.bookService.getBookByIsbn(this.isbn).subscribe((data) => {

      console.log("data is..." + JSON.stringify(data));

      if (data.length > 0) {
        data.forEach((element) => {

          //this.isbn = element.isbn;
          this.dispIsbn = element.isbn;

          this.msg = "ISBN already exists";
          this.foundFlag = true;

          // setTimeout(function() {
          //location.reload();
          //   this.msg = "";
          //   this.foundFlag = false;
          // }, 3000);

          setTimeout(() => {
            this.foundFlag = false;
            userForm.reset();
          }, 3000);

        });
      } else {
        this.foundFlag = false;
        this.showAddForm = true;
      }
    });

  }



}