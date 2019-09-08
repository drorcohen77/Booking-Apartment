import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
// import {Rental} from './rental.model';
import { HttpClient } from '@angular/common/http';
import { Rental } from './rental.model';



@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private Url:string = "/api/v1/rentals/";
  private UrlRentalManage: string = "/api/v1/rentals/manage";
  

  constructor(private http:HttpClient) { }
  
  public getApartmentById(apartmentId: string): Observable<any>{
    console.log(apartmentId);
    return this.http.get(this.Url+ apartmentId);
  }

  public getApartmentByCity(city: string): Observable<any>{
    console.log(city);
    return this.http.get(this.Url+ `?city=${city}`);
  }

  public getApartments() :Observable<any> {
    return this.http.get(this.Url);
  }

  public createRental(rental: Rental) : Observable<any> {
    return this.http.post(this.Url, rental);
  }

  public getRentalsManage() : Observable<any> {
    return this.http.get(this.UrlRentalManage);
  }

 
}
