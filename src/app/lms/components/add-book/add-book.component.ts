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

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

      this.categories = [
            "Computer Science",
            "Phylosophy",
            "Medical Science",
            "Art and Living"
      ]
  }

  onSubmit(value:Book){

    this.submitted = true;

       this.bookService.addBook(value).subscribe(data => {
            
          this.router.navigate(['Books/viewAllBooks'], {state: {newBook : true, componentOrigin:"app-add-book"}});
            
          },
            (error:any) => console.log(error)
          );


        // this.bookService.addBook(value);
  }


  onCancel() {
    this.router.navigate(['Books']);
}


}
