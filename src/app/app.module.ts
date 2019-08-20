import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule,routingComponents, } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { MainModule } from './main/main.module';
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './auth/auth.component';


// import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    HeaderComponent,
    AuthComponent
    // AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    AuthModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
