import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../Services/auth.guard';

import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageComponent } from './manage.component';
import { MainServiceService } from '../Services/main-service.service';
import { BookingService } from '../Services/booking.service';
import { NgPipesModule } from 'ngx-pipes';
import { FormatDatePipe } from '../common/Pipes/format-date.pipe';


const routes: Routes = [
    {
      path:'manage',
      component:ManageComponent,
      children:[
          {path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard]},
          {path: 'bookings', component: ManageBookingComponent,canActivate: [AuthGuard]}
      ]
    }
  ]

@NgModule({
    declarations: [
        ManageBookingComponent,
        ManageRentalComponent,
        ManageComponent,
        FormatDatePipe
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule
    ],
    providers:[MainServiceService,BookingService]
})

export class ManageModule {}