import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routingComponents, } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
// import { MainComponent } from './main/main.component';
import { MainModule } from './main/main.module';
// import { UppercasePipe } from './common/Pipes/uppercase.pipe';
// import { RentalListComponent } from './main/rental-list/rental-list.component';
// import { RentalListItemComponent } from './main/rental-list-item/rental-list-item.component';

@NgModule({
  declarations: [
    routingComponents,
    AppComponent,
    HeaderComponent,
    // UppercasePipe,
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
