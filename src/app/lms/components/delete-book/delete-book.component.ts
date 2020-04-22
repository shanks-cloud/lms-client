import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})

export class DeleteBookComponent implements OnInit {

  isbn: number;
  deleteBook: boolean

  constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.isbn = parseInt(this.route.snapshot.paramMap.get("isbn"));
    this.deleteBookByIsbn();
  }

  deleteBookByIsbn() {
    this.bookService.deleteBookByIsbn(this.isbn).subscribe((data) => {
      this.router.navigate(['Books/viewAllBooks'], { state: { deleteBook: true, componentOrigin: "app-delete-book", isbn: this.isbn } });
    },
      (error: any) => console.log(error)
    );
  }
}
