import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents, } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
// import { RentalListComponent } from './main/rental-list/rental-list.component';
// import { RentalListItemComponent } from './main/rental-list-item/rental-list-item.component';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
