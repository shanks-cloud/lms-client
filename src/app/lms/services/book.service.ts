import { Injectable } from '@angular/core';
import { BookDTO } from '../model/BookDTO';
import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private bookUrl = 'http://localhost:8080/Books';
  private catalogUrl = 'http://localhost:8080/Catalog';

  constructor(private httpService: HttpClient, authService: AuthService) { }

  addBook(bookDTO: BookDTO): Observable<BookDTO> {
    console.log("payload is.." + JSON.stringify(bookDTO));
    return this.httpService.post<BookDTO>(this.bookUrl, bookDTO);
  }

  getAllBooks(): Observable<BookDTO[]> {
    return this.httpService.get<BookDTO[]>(this.bookUrl + '/' + 'viewAllBooks');
  }

  getBookByIsbn(isbn: any): Observable<BookDTO[]> {
    return this.httpService.get<BookDTO[]>(this.bookUrl + '/' + 'fetchBook' + '/' + isbn);
  }

  updateBook(bookDTO: BookDTO, isbn: number): Observable<BookDTO> {
    console.log("edited value is.." + JSON.stringify(bookDTO));
    return this.httpService.put<BookDTO>(this.bookUrl + '/' + 'editBook' + '/' + isbn, bookDTO);
  }

  archiveBookByIsbn(isbn: number, bookArchiveReason: string): Observable<any> {
    //return this.httpService.delete<BookDTO[]>(this.bookUrl + '/' + 'deleteBook' + '/' + isbn + '/' + bookDeleteReason);
    return this.httpService.put<any>(this.bookUrl + '/' + 'archiveBook' + '/' + isbn, bookArchiveReason);
  }

  unArchiveBookByIsbn(isbn: number): Observable<any> {
    return this.httpService.put<any>(this.bookUrl + '/' + 'unArchiveBook' + '/' + isbn, '');
  }


  fetchAllFilesByCategory(bookCategory: string): Observable<any> {
    return this.httpService.get<any>(this.catalogUrl + '/' + bookCategory);
  }

  fetchAllFiles(): Observable<any> {
    return this.httpService.get<any>(this.catalogUrl);
  }

  getNewArrivalsCount(): Observable<number> {
    return this.httpService.get<number>(this.bookUrl + '/' + 'newArrivalsCount');
  }

  getAllActiveBooks(): Observable<BookDTO[]> {
    return this.httpService.get<BookDTO[]>(this.bookUrl + '/' + 'allActiveBooks');
  }


}