import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents, } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    HeaderComponent,
    MainComponent,
    RentalListComponent,
    RentalListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
