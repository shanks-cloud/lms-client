import { Injectable } from '@angular/core';
import { Book } from '../model/Book';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  private bookUrl = 'http://localhost:8080/Books';

  constructor(private httpService: HttpClient) { }

  addBook(val: Book): Observable<Book> {

    console.log("addBook method called inside service method");
    console.log("payload is.." + JSON.stringify(val));

    return this.httpService.post<Book>(this.bookUrl, val);
  }

  getAllBooks(): Observable<Book[]> {
    return this.httpService.get<Book[]>(this.bookUrl + '/' + 'viewAllBooks');
  }

  getBookByIsbn(isbn: any): Observable<Book[]> {
    return this.httpService.get<Book[]>(this.bookUrl + '/' + 'fetchBook' + '/' + isbn);
  }

  updateBook(val: Book, isbn: number): Observable<Book> {
    console.log("edited value is" + JSON.stringify(val));
    return this.httpService.put<Book>(this.bookUrl + '/' + 'editBook' + '/' + isbn, val);
  }

  deleteBookByIsbn(isbn: number): Observable<Book[]> {
    return this.httpService.delete<Book[]>(this.bookUrl + '/' + 'deleteBook' + '/' + isbn);
  }

}
