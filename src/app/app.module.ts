import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatRadioModule, MatGridListModule, MatToolbarModule, MatDialogModule, MAT_RADIO_DEFAULT_OPTIONS, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DATE_LOCALE } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { TopBarComponent } from './lms/components/top-bar/top-bar.component';
import { DashboardComponent } from './lms/components/dashboard/dashboard.component';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BookService } from './lms/services/book.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './lms/components/login/login.component';
import { DialogComponent } from './lms/components/dialog/dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    TopBarComponent,
    DashboardComponent,
    LoginComponent,
    DialogComponent,

  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,

    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
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
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [BookService, [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ]],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }