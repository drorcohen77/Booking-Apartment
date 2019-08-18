import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import 'rxjs/Rx'

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookingsUrl:string = "/api/v1/bookings";

  constructor(private http:HttpClient) { }


  public bookings(booking: any): Observable<any> {
    console.log(booking);
    return this.http.post(this.bookingsUrl,booking);
  }
}
