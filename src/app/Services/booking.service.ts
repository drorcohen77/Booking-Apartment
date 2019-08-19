import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from './booking.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl:string = "/api/v1/bookings";

  constructor(private http:HttpClient) { }


  public createBooking(booking: Booking): Observable<any> {
    console.log(booking);
    return this.http.post(this.bookingsUrl,booking);
  }
}
