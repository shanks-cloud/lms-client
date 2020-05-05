import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  bookArchiveReason: String;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, private router: Router) { }

  ngOnInit(): void {
    this.bookArchiveReason = "lost";
  }

  onClick() {
    this.dialogRef.close();
    this.router.navigate(['Books/viewAllActiveBooks']);
  }

}
