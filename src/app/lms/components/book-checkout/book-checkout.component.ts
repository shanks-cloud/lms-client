import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { BookService } from '../../services/book.service';
import { MemberService } from '../../services/member.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';
import { BookCheckoutDTO } from '../../model/BookCheckoutDTO';
import { NgForm } from '@angular/forms';



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
  msg: String;

  tempArr = [];
  selectedBookOptions = [];
  selectedMemberOptions = [];
  displayedColumns = [];

  bookRestrictFlag: boolean;
  memberRestrictFlag: boolean;
  bookCheckedFlag: boolean;
  memberCheckedFlag: boolean;
  showTblFlag: boolean;
  bookMemberSelection: boolean;
  msgFlag: boolean;

  dataSource: MatTableDataSource<any>;

  BOOK_TREE_DATA: BookNode[] = [

  ]

  MEMBER_TREE_DATA: MemberNode[] = [

  ]

  FINAL_TREE_DATA = [

  ]

  bookCheckoutDTO = new BookCheckoutDTO;

  // treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  treeControl = new NestedTreeControl<BookNode>(node => node.children);

  // dataSource = new MatTreeNestedDataSource<FoodNode>();
  dataSourceBookNode = new MatTreeNestedDataSource<BookNode>();

  dataSourceMemberNode = new MatTreeNestedDataSource<MemberNode>();

  bookCheckOutDataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private bookService: BookService, private memberService: MemberService, private router: Router) { }

  ngOnInit(): void {

    this.bookMemberSelection = false;
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

        if (!element.checkOutStatus) {

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
        };
      });

      console.log("tree data is.. " + JSON.stringify(this.BOOK_TREE_DATA));
      this.dataSourceBookNode.data = this.BOOK_TREE_DATA;
    });
  }

  showSelectedBooks(val: string) {

    if (this.selectedBookOptions.length < 2) {
      //this.selectedBookOptions.push({ 'isbn': val });
      this.selectedBookOptions.push(val);

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
      //this.selectedMemberOptions.push({ 'memberId': val });
      this.selectedMemberOptions.push(val);

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

    if ((this.selectedBookOptions.length == 2 || this.selectedBookOptions.length == 1) && (this.selectedMemberOptions.length == 1)) {
      this.bookMemberSelection = true;

      this.showTblFlag = true;
      this.displayedColumns = ['isbn', 'memberId', 'firstName', 'lastName'];

      this.memberService.getAllMembers().subscribe((data) => {
        data.forEach((element) => {

          this.selectedMemberOptions.forEach((ele) => {

            if (element.memberId == ele) {

              this.tempArr.push(
                {
                  "isbn": this.selectedBookOptions,
                  "memberId": this.selectedMemberOptions,
                  "firstName": element.firstName,
                  "lastName": element.lastName
                });
              this.FINAL_TREE_DATA = this.tempArr;

              console.log("final tree data is " + JSON.stringify(this.FINAL_TREE_DATA));

              this.bookCheckOutDataSource = new MatTableDataSource(this.FINAL_TREE_DATA);
            }
          })
        })
      })
    }
  }


  onConfirm(msgForm: NgForm) {

    this.bookCheckoutDTO.isbn = [];

    this.selectedBookOptions.forEach((element) => {
      console.log("element value is " + element);
      this.bookCheckoutDTO.isbn.push(parseInt(element));
      console.log("bookCheckoutDTO's isbn values are.. " + this.bookCheckoutDTO.isbn);
    })

    this.selectedMemberOptions.forEach((element) => {
      this.bookCheckoutDTO.memberId = parseInt(element);
      console.log("bookCheckoutDTO's member values are.. " + this.bookCheckoutDTO.memberId);
    })

    this.FINAL_TREE_DATA.forEach((element) => {

      console.log("element.firstName is " + element.firstName);
      this.bookCheckoutDTO.firstName = element.firstName;

      console.log("element.lastName is " + element.lastName);
      this.bookCheckoutDTO.lastName = element.lastName;

    })

    console.log("bookCheckOutDTO is " + JSON.stringify(this.bookCheckoutDTO));

    this.bookService.checkoutBook(this.bookCheckoutDTO).subscribe((data) => {
      console.log("Book checked-out details.." + JSON.stringify(data));
      this.msgFlag = true;
      this.msg = "Book cheecked-out successfully..";

      setTimeout(() => {
        this.msgFlag = false;
        msgForm.reset;
        this.onReset();
      }, 4000);
    })

  }


  showDetails(row: any) {
    console.log(row);
  }


  hasChild = (_: number, node: BookNode) => !!node.children && node.children.length > 0;
  // hasChild = (_: number, node: MemberNode) => !!node.children && node.children.length > 0;

}