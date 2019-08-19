import { BookingService } from './../../../Services/booking.service';
import { Component, OnInit, Input } from '@angular/core';
import {Booking} from '../../../Services/booking.model';
import { HelperService } from 'src/app/Services/helper.service';
import { Rental } from 'src/app/Services/rental.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';




@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;

  newBooking: Booking;
  modalRef:any;

  public daterange: any = {};
  public bookedOutDates: any[] =[];

  // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
      locale: { format: Booking.BOOKING_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helper:HelperService, private modalService: NgbModal, private BookingService: BookingService) { }

  ngOnInit() {
    this.newBooking= new Booking;

    this.getBookedOutDates();
  }

  private checkForInvalidDates(date) {
    
    return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days')<0;
    
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;

    if (bookings && bookings.length > 0) {
      bookings.forEach((booking:Booking)=> {
        // const dateRange =this.helper.getRangeOfDates(booking.startAt, booking.endAt);
        // this.bookedOutDates.push(...dateRange);
        this.bookedOutDates =this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        
      });
    }
  }

  openConfirmModal(content){

    this.modalRef = this.modalService.open(content);
    console.log(this.newBooking);
  }

  createBooking() {
    console.log(this.newBooking);
    this.newBooking.rental = this.rental;
    this.BookingService.createBooking(this.newBooking).subscribe(
      (bookingData) =>{
        debugger;
        this.newBooking = new Booking();
        this.modalRef.close();
      },
      () =>{
      
    });
  }

    public selectedDate(value: any, datepicker?: any) {
        this.newBooking.startAt = this.helper.formatBookingDate(value.start);
        this.newBooking.endAt = this.helper.formatBookingDate(value.end);
        this.newBooking.days = -(value.start.diff(value.end, 'days'));
        this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;

        console.log(this.newBooking);

        // or manupulat your own internal property
        // this.daterange.start = value.start;
        // this.daterange.end = value.end;
        // this.daterange.label = value.label;
    }

}
