import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideNavComponent } from './lms/components/side-nav/side-nav.component';
import { ViewAllBooksComponent } from './lms/components/view-all-books/view-all-books.component';
import { AddBookComponent } from './lms/components/add-book/add-book.component';
import { EditBookComponent } from './lms/components/edit-book/edit-book.component';
import { ArchiveBookComponent } from './lms/components/archive-book/archive-book.component';
import { CatalogComponent } from './lms/components/catalog/catalog.component';
import { ComputerScienceComponent } from './lms/components/computer-science/computer-science.component';
import { AviationComponent } from './lms/components/aviation/aviation.component';
import { MedicalScienceComponent } from './lms/components/medical-science/medical-science.component';
import { ArtAndLivingComponent } from './lms/components/art-and-living/art-and-living.component';
import { AstronomyComponent } from './lms/components/astronomy/astronomy.component';
import { PhilosophyComponent } from './lms/components/philosophy/philosophy.component';
import { ViewAllInactiveBooksComponent } from './lms/components/view-all-inactive-books/view-all-inactive-books.component';
import { ProfileComponent } from './lms/components/profile/profile.component';
import { HomeComponent } from './lms/components/home/home.component';
import { PreLoginComponent } from './lms/components/pre-login/pre-login.component';
import { DashboardComponent } from './lms/components/dashboard/dashboard.component';
import { AuthguardService } from './lms/services/authguard.service';
import { BookCheckoutComponent } from './lms/components/book-checkout/book-checkout.component';


const routes: Routes = [

  { path: '', component: PreLoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthguardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthguardService] },
  //{ path: '**', component: PageNotFound }

  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'books', component: SideNavComponent,
        children: [
          { path: '', redirectTo: 'viewAllActiveBooks', pathMatch: 'full' },
          { path: 'addBook', component: AddBookComponent, canActivate: [AuthguardService] },
          { path: 'viewAllActiveBooks', component: ViewAllBooksComponent, canActivate: [AuthguardService] },
          { path: 'editBook/:isbn', component: EditBookComponent, canActivate: [AuthguardService] },
          { path: 'archiveBook/:isbn', component: ArchiveBookComponent, canActivate: [AuthguardService] },
          { path: 'viewAllInActiveBooks', component: ViewAllInactiveBooksComponent, canActivate: [AuthguardService] },
          { path: 'checkoutBook', component: BookCheckoutComponent, canActivate: [AuthguardService] }
        ]
      },
      {
        path: 'catalog', component: SideNavComponent,
        children: [
          { path: '', redirectTo: 'viewAll', pathMatch: 'full' },
          { path: 'viewAll', component: CatalogComponent, canActivate: [AuthguardService] },
          { path: 'computerScience', component: ComputerScienceComponent, canActivate: [AuthguardService] },
          { path: 'aviation', component: AviationComponent, canActivate: [AuthguardService] },
          { path: 'medicalScience', component: MedicalScienceComponent, canActivate: [AuthguardService] },
          { path: 'artAndLiving', component: ArtAndLivingComponent, canActivate: [AuthguardService] },
          { path: 'astronomy', component: AstronomyComponent, canActivate: [AuthguardService] },
          { path: 'philosophy', component: PhilosophyComponent, canActivate: [AuthguardService] },
        ]
      },
    ]
  }
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
  ArchiveBookComponent,
  CatalogComponent,
  ComputerScienceComponent,
  AviationComponent,
  MedicalScienceComponent,
  AstronomyComponent,
  PhilosophyComponent,
  ArtAndLivingComponent,
  ViewAllInactiveBooksComponent,
  ProfileComponent,
  HomeComponent,
  PreLoginComponent,
  DashboardComponent,
  BookCheckoutComponent
]