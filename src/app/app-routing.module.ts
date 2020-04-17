import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBookComponent } from './lms/components/add-book/add-book.component';
import { SideNavComponent } from './lms/components/side-nav/side-nav.component';
import { ViewAllBooksComponent } from './lms/components/view-all-books/view-all-books.component';


const routes: Routes = [
 
  { path: 'Books', component: SideNavComponent },
  { path: 'Books/addBook', component: AddBookComponent },
  { path: 'Books/viewAllBooks', component: ViewAllBooksComponent }
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const routingComponents = [
  AddBookComponent,
  SideNavComponent,
  ViewAllBooksComponent
]