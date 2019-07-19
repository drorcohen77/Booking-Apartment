import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { Rental } from 'src/app/Services/rental.model';


@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})
export class RentalListComponent implements OnInit {

  public apartments: Rental[]=[];
  constructor(private MainService: MainServiceService) { }

  ngOnInit() {

    const apartmentObservable= this.MainService.getApartments();
    apartmentObservable.subscribe(
      (apartment : Rental[]) => {
        this.apartments=apartment;
      },
      (err)=>{
      },
      ()=>{
      });
  }

}
