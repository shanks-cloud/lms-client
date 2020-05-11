import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSidenavModule, MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatRadioModule, MatGridListModule, MatToolbarModule, MatDialogModule, MAT_RADIO_DEFAULT_OPTIONS, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DATE_LOCALE, MatMenuModule, MatIconModule, MatSlideToggleModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { TopBarComponent } from './lms/components/top-bar/top-bar.component';
import { DashboardComponent } from './lms/components/dashboard/dashboard.component';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { MatPaginatorModule } from '@angular/material/paginator';

import { DialogComponent } from './lms/components/dialog/dialog.component';

import { MemberService } from './lms/services/member.service';
import { BookService } from './lms/services/book.service';
import { PreLoginComponent } from './lms/components/pre-login/pre-login.component';
import { HttpInterceptorService } from './lms/services/httpInterceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DashboardComponent,
    DialogComponent,
    routingComponents,
    PreLoginComponent,

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
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [BookService, MemberService, [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],

    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }