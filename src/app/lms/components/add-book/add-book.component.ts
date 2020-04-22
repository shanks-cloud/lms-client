import { Component, OnInit, Input } from '@angular/core';
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

  minDate = new Date();
  maxDate = new Date();
  endDate = this.maxDate.getUTCDate();
  startDate = this.minDate.setUTCDate(this.endDate - 31);

  @Input() parentData: any;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

    this.categories = [
      "Computer Science",
      "Phylosophy",
      "Medical Science",
      "Art and Living",
      "Astronomy",
      "Aviation"
    ]

    //this.isbn = history.state.isbn;
    //console.log("isbn inside ngOnInit.." + this.isbn);

    console.log("inside ngOnInit parentData is..." + this.parentData);
  }

  onSubmit(value: Book) {

    this.submitted = true;
    value.bookImageName = this.selectedFile.name;

    //value.isbn = this.isbn;
    value.isbn = this.parentData;

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
    }
  }

  onCancel() {
    this.router.navigate(['Books']);
  }

}
