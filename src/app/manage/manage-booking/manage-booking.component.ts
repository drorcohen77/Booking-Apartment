import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/Services/booking.service';
import { Rental } from 'src/app/Services/rental.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  public bookingsManage: Rental[];
  public errors: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {

    this.bookingService.getRentalsManage().subscribe(
      (BookingManage: Rental[]) => {
        this.bookingsManage = BookingManage;
        console.log(this.bookingsManage);
      },
      (errorsResponse: HttpErrorResponse) => {
        this.errors = errorsResponse.error.errors;
      }
    );

  }

}
