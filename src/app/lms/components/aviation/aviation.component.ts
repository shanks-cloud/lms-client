import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aviation',
  templateUrl: './aviation.component.html',
  styleUrls: ['./aviation.component.css']
})

export class AviationComponent implements OnInit {

  filePathCategories = [];
  url: string;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.url = this.route.snapshot.url.join('/');
    console.log("url ref is " + this.url);

    this.fetchAllFilesByCategory();
  }

  fetchAllFilesByCategory() {

    this.bookService.fetchAllFilesByCategory(this.url).subscribe((data) => {
      console.log("inside aviation component...");
      this.filePathCategories = data;
    });
  }

}
