import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { Rental } from 'src/app/Services/rental.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.sass']
})
export class RentalSearchComponent implements OnInit {

  public apartments: Rental[] =[];
  private paramCity: string;

  constructor(private route: ActivatedRoute, private mainService: MainServiceService) { }

  ngOnInit() {

    this.route.params.subscribe((params) =>{
      console.log(params);

      this.paramCity = params['city'];
      this.getCity();
    });
  }


    getCity() {

      this.mainService.getApartmentByCity(this.paramCity).subscribe(
      (apartmentCity: Rental[]) => {
        this.apartments = apartmentCity;
        console.log(this.apartments);;
      },
      (err)=>{},
      ()=>{}
      );
    }

}
