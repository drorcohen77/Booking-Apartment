import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
// import {Rental} from './rental.model';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private Url:string = "/api/v1/rentals/";

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

  
}
