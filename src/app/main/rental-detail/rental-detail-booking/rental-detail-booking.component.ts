import { BookingService } from './../../../Services/booking.service';
import { Component, OnInit, Input , ViewChild, ViewEncapsulation } from '@angular/core';
import {Booking} from '../../../Services/booking.model';
import { HelperService } from 'src/app/Services/helper.service';
import { Rental } from 'src/app/Services/rental.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { ToastrService } from 'ngx-toastr';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;

  newBooking: Booking;
  modalRef:any;

  public daterange: any = {};
  public bookedOutDates: any[] =[];
  public errors: any[] = [];

  // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
    public options: any = {
      locale: { format: Booking.BOOKING_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      autoUpdateInput: false,
      isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  constructor(private helper:HelperService, private modalService: NgbModal, private BookingService: BookingService, private toastr: ToastrService) { }

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
        const dateRange =this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
        // this.bookedOutDates =this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
        
      });
    }
  }

  private addNewBookedDates(bookingData: any) {
    const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content){
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  createBooking() {
    console.log(this.newBooking);
    this.newBooking.rental = this.rental;
    this.BookingService.createBooking(this.newBooking).subscribe(
      (bookingData: any) =>{
        this.addNewBookedDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking has been succesfully created, check your booking detail in manage section', 'Success!');
      },
      (errorResponse: any) =>{
        this.errors = errorResponse.error.errors;
    });
  }

    public selectedDate(value: any, datepicker?: any) {
        this.options.autoUpdateInput = true;
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
