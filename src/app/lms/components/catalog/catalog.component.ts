import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {

  filePathCatalogs = [];
  catalog: boolean;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.fetchAllFilesByCatalog();
  }

  fetchAllFilesByCatalog() {
    this.catalog = true;
    this.bookService.fetchAllFiles().subscribe((data) => {
      this.filePathCatalogs = data;
    })
  }

}