import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule,routingComponents, } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { MainModule } from './main/main.module';
import { ManageModule } from './manage/manage.module';
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './auth/auth.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { ManageComponent } from './manage/manage.component';
import { ManageRentalComponent } from './manage/manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage/manage-booking/manage-booking.component';


// import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    HeaderComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    ManageModule,
    AuthModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
