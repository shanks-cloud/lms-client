import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})


export class TopBarComponent implements OnInit {
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor() { }

  ngOnInit(): void {
    // this.trigger.openMenu();
  }

}
