import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideNavComponent } from './lms/components/side-nav/side-nav.component';
import { ViewAllBooksComponent } from './lms/components/view-all-books/view-all-books.component';
import { FetchBookComponent } from './lms/components/fetch-book/fetch-book.component';
import { AddBookComponent } from './lms/components/add-book/add-book.component';
import { EditBookComponent } from './lms/components/edit-book/edit-book.component';
import { DeleteBookComponent } from './lms/components/delete-book/delete-book.component';


const routes: Routes = [

  { path: 'Books', component: SideNavComponent },
  { path: 'Books/fetchBook', component: FetchBookComponent },
  // { path: 'Books/addBook', component: AddBookComponent },
  { path: 'Books/viewAllBooks', component: ViewAllBooksComponent },
  { path: 'editBook/:isbn', component: EditBookComponent },
  { path: 'deleteBook/:isbn', component: DeleteBookComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  AddBookComponent,
  SideNavComponent,
  ViewAllBooksComponent,
  FetchBookComponent,
  EditBookComponent,
  DeleteBookComponent,
]