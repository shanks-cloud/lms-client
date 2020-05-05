import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { BookDTO } from '../../model/BookDTO';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})

export class DeleteBookComponent implements OnInit {

  isbn: number;
  archiveBook: boolean;
  bookDTO: BookDTO;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private bookService: BookService, private router: Router) {

  }

  ngOnInit(): void {
    this.isbn = parseInt(this.route.snapshot.paramMap.get("isbn"));
    this.archiveBookByIsbn();
  }

  archiveBookByIsbn() {
    let diaglogRef = this.dialog.open(DialogComponent, {
      height: '300px',
      width: '350px',
    });


    diaglogRef.afterClosed().subscribe((bookArchiveReason) => {
      console.log("bookArchiveReason is.. " + bookArchiveReason);

      this.bookService.archiveBookByIsbn(this.isbn, bookArchiveReason).subscribe((data) => {
        this.router.navigate(['Books/viewAllInActiveBooks']);
      },
        (error: any) => console.log(error)
      );
    });
  }
}
