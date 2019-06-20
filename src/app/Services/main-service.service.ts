import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Rental} from './rental.model';


@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  private apartments: Rental[] = [{
    id: "1",
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
  },
  {
    id: "2",
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: "3",
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 334,
    shared: true,
    createdAt: "24/12/2017"
  },
  {
    id: "4",
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "Very nice apartment",
    dailyRate: 33,
    shared: true,
    createdAt: "24/12/2017"
}];

public getApartmentById(apartmentId:string):Observable<Rental>{
  return new Observable<Rental> ((observer) =>{

    setTimeout(() =>{
      const foundApartment = this.apartments.find((apartment) =>{
        return apartment.id==apartmentId;
      });

      observer.next(foundApartment);
    }, 500);
  })
}

public getApartments() :Observable<Rental[]> {
  const apartmntObservable :Observable<Rental[]>= new Observable((observer)=>{
    setTimeout(()=>{
      observer.next(this.apartments)}
      ,1000);

    setTimeout(()=>{
      observer.error("I'M ERROR")}
      ,2000);

    setTimeout(()=>{
      observer.complete()}
      ,3000);

  });
  return apartmntObservable;
}

  constructor() { }
}
