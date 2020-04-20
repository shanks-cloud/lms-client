import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';

import { FormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatRadioModule, MatGridListModule, MatToolbarModule} from '@angular/material';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { TopBarComponent } from './lms/components/top-bar/top-bar.component';
import { DashboardComponent } from './lms/components/dashboard/dashboard.component';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BookService } from './lms/services/book.service';
import { ViewAllBooksComponent } from './lms/components/view-all-books/view-all-books.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TopBarComponent,
    DashboardComponent,
    ViewAllBooksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatSidenavModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatGridListModule,
    MatToolbarModule,
    MatPaginatorModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent], 
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }