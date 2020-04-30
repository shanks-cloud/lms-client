import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})


export class SideNavComponent implements OnInit {

  filePathCatalogs = [];
  catalog: boolean;
  url: string;

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.url = this.route.snapshot.url.join('/');
    console.log("url ref is " + this.url);

  }
}