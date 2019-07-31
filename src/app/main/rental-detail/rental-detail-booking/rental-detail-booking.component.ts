import { Component, OnInit, Input } from '@angular/core';
import {Booking} from '../../../Services/booking.model';
import { HelperService } from 'src/app/Services/helper.service';

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() price: number;
  @Input() bookings: Booking[];

  public daterange: any = {};
  public bookedOutDates: any[] =[];

  // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
      locale: { format: 'YYYY-MM-DD' },
      alwaysShowCalendars: false,
      opens: 'left'
  };

  constructor(private helper:HelperService) { }

  ngOnInit() {

    this.getBookedOutDates();
  }

  private getBookedOutDates() {
    if (this.bookings && this.bookings.length > 0) {
      this.bookings.forEach((booking:Booking)=> {
        const dateRange =this.helper.getRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

    public selectedDate(value: any, datepicker?: any) {
        // this is the date the iser selected
        console.log(value);

        // any object can be passed to the selected event and it will be passed back here
        datepicker.start = value.start;
        datepicker.end = value.end;

        // or manupulat your own internal property
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
    }

}
