import { NgModule } from '@angular/core';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { MainServiceService } from '../Services/main-service.service';
import { Routes, RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';

import { NgPipesModule } from 'ngx-pipes';
import { UppercasePipe } from '../common/Pipes/uppercase.pipe';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { AuthGuard } from '../Services/auth.guard';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';


const routes: Routes = [
    {
      path:'rentals',
      component:MainComponent,
      children:[
          {path: '', component: RentalListComponent},
          {path: ':apartmentId', component: RentalDetailComponent, canActivate: [AuthGuard]}
      ]
    }
  ]

@NgModule({
    declarations: [
        MainComponent,
        RentalListComponent,
        RentalListItemComponent,
        RentalDetailComponent,
        UppercasePipe,
        RentalDetailBookingComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker
    ],
    providers:[MainServiceService]
})

export class MainModule {}