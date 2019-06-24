import { NgModule } from '@angular/core';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { MainServiceService } from '../Services/main-service.service';
import { Routes, RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
    {
      path:'rentals',
      component:MainComponent,
      children:[
          {path: '', component: RentalListComponent},
          {path: ':rentalId', component: RentalDetailComponent}
      ]
    }
  ]

@NgModule({
    declarations: [
        MainComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule
    ],
    providers:[MainServiceService]
})

export class MainModule {}