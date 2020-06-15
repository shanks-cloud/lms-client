import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BookService } from '../../services/book.service';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';


interface BookNode {
  name?: String;
  children?: BookNode[];
}

interface MemberNode {
  name: String;
  children?: MemberNode[];
}


@Component({
  selector: 'app-book-checkout',
  templateUrl: './book-checkout.component.html',
  styleUrls: ['./book-checkout.component.css']
})

export class BookCheckoutComponent implements OnInit {

  fullName: String;

  selectedBookOptions = [];
  selectedMemberOptions = [];
  displayedColumns = [];

  bookRestrictFlag: boolean;
  memberRestrictFlag: boolean;
  bookCheckedFlag: boolean;
  memberCheckedFlag: boolean;
  showTblFlag: boolean;

  dataSource: MatTableDataSource<any>;

  BOOK_TREE_DATA: BookNode[] = [

  ]

  MEMBER_TREE_DATA: MemberNode[] = [

  ]

  FINAL_TREE_DATA = [];
  merged_object = [];


  // treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  treeControl = new NestedTreeControl<BookNode>(node => node.children);

  // dataSource = new MatTreeNestedDataSource<FoodNode>();
  dataSourceBookNode = new MatTreeNestedDataSource<BookNode>();

  dataSourceMemberNode = new MatTreeNestedDataSource<MemberNode>();

  bookCheckOutDataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService, private memberService: MemberService, private router: Router) { }

  ngOnInit(): void {

    this.populateBookTree();
    this.populateMemberTree();

  }


  populateBookTree() {

    this.bookService.getAllActiveBooks().subscribe((data) => {

      console.log("data is " + JSON.stringify(data));


      data.forEach((element) => {

        // if (this.BOOK_TREE_DATA.length > 0) {
        //   this.BOOK_TREE_DATA.filter((ele) => {
        //       if (ele.name in element.bookCategory) {

        //       }

        //   })

        // }

        this.BOOK_TREE_DATA.push({
          'name': element.bookCategory,
          'children': [
            {
              'name': element.bookTitle,
              'children': [
                { 'name': JSON.stringify(element.isbn) }
              ]
            }
          ]
        });
      });

      console.log("tree data is.. " + JSON.stringify(this.BOOK_TREE_DATA));
      this.dataSourceBookNode.data = this.BOOK_TREE_DATA;
    });
  }

  showSelectedBooks(val: string) {

    if (this.selectedBookOptions.length < 2) {
      this.selectedBookOptions.push({ 'isbn': val });
      console.log("checkbox value after pushing.." + this.bookCheckedFlag);
      console.log("selected Book options " + JSON.stringify(this.selectedBookOptions));
    } else {
      this.bookRestrictFlag = true;

    }
  }

  populateMemberTree() {
    this.memberService.getAllMembers().subscribe((data) => {
      data.forEach((element) => {

        this.fullName = element.firstName + ' ' + element.lastName;

        this.MEMBER_TREE_DATA.push({
          'name': this.fullName,
          'children': [
            {
              'name': JSON.stringify(element.memberId)
            }
          ]
        })
      })

      this.dataSourceMemberNode.data = this.MEMBER_TREE_DATA;
    })
  }


  showSelectedMembers(val: string) {
    if (this.selectedMemberOptions.length < 1) {
      this.selectedMemberOptions.push({ 'memberId': val });
      console.log("selected Member options " + JSON.stringify(this.selectedMemberOptions));
    } else {
      this.memberRestrictFlag = true;

    }
  }

  onReset() {
    this.router.navigate(['dashboard'], { skipLocationChange: true }).then(() => {
      this.router.navigate(['home/books/checkoutBook']);
    });

  }


  showTable() {
    this.showTblFlag = true;
    // this.displayedColumns = ['bookCategory', 'bookTitle', 'isbn', 'memberId'];
    this.displayedColumns = ['isbn', 'memberId'];

    console.log("selected book options are... " + JSON.stringify(this.selectedBookOptions));
    console.log("selected member options are.." + JSON.stringify(this.selectedMemberOptions));

    var merged_object = this.selectedBookOptions.concat(this.selectedMemberOptions);

    console.log("final tree data is " + JSON.stringify(merged_object));
    this.bookCheckOutDataSource = new MatTableDataSource(merged_object);
  }


  showDetails(row: any) {
    console.log(row);
  }


  hasChild = (_: number, node: BookNode) => !!node.children && node.children.length > 0;
  // hasChild = (_: number, node: MemberNode) => !!node.children && node.children.length > 0;

}