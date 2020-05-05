import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideNavComponent } from './lms/components/side-nav/side-nav.component';
import { ViewAllBooksComponent } from './lms/components/view-all-books/view-all-books.component';
import { AddBookComponent } from './lms/components/add-book/add-book.component';
import { EditBookComponent } from './lms/components/edit-book/edit-book.component';
import { DeleteBookComponent } from './lms/components/delete-book/delete-book.component';
import { CatalogComponent } from './lms/components/catalog/catalog.component';
import { ComputerScienceComponent } from './lms/components/computer-science/computer-science.component';
import { AviationComponent } from './lms/components/aviation/aviation.component';
import { MedicalScienceComponent } from './lms/components/medical-science/medical-science.component';
import { ArtAndLivingComponent } from './lms/components/art-and-living/art-and-living.component';
import { AstronomyComponent } from './lms/components/astronomy/astronomy.component';
import { PhilosophyComponent } from './lms/components/philosophy/philosophy.component';
import { ViewAllInactiveBooksComponent } from './lms/components/view-all-inactive-books/view-all-inactive-books.component';


const routes: Routes = [
  {
    path: 'Books', component: SideNavComponent,
    children: [
      { path: 'addBook', component: AddBookComponent },
      { path: 'viewAllActiveBooks', component: ViewAllBooksComponent },
      { path: 'editBook/:isbn', component: EditBookComponent },
      { path: 'deleteBook/:isbn', component: DeleteBookComponent },
      { path: 'viewAllInActiveBooks', component: ViewAllInactiveBooksComponent },

    ]
  },

  {
    path: 'Catalog', component: SideNavComponent,
    children: [
      { path: '', redirectTo: 'viewAll', pathMatch: 'full' },
      { path: 'viewAll', component: CatalogComponent },
      { path: 'computerScience', component: ComputerScienceComponent },
      { path: 'aviation', component: AviationComponent },
      { path: 'medicalScience', component: MedicalScienceComponent },
      { path: 'artAndLiving', component: ArtAndLivingComponent },
      { path: 'astronomy', component: AstronomyComponent },
      { path: 'philosophy', component: PhilosophyComponent },
      // { path: '**', component: PageNotFound }
    ]
  },
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
  EditBookComponent,
  DeleteBookComponent,
  CatalogComponent,
  ComputerScienceComponent,
  AviationComponent,
  MedicalScienceComponent,
  AstronomyComponent,
  PhilosophyComponent,
  ArtAndLivingComponent,
  ViewAllInactiveBooksComponent
]