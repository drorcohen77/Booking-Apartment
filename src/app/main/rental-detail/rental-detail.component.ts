import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { Rental } from 'src/app/Services/rental.model';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.sass']
})
export class RentalDetailComponent implements OnInit {

  // private rentalID: string;
  private Apartment: Rental;

  constructor(private route: ActivatedRoute, private mainService: MainServiceService) { }

  ngOnInit() {
    // this.rentalID=parseInt(this.route.snapshot.paramMap.get('rentalId'));  // another way of getting parameters from URL using ActivatedRoute Class.
    // console.log(this.rentalID);

    this.route.params.subscribe(
      (params) => {
        // this.rentalID = params['rentalId'];
        // console.log(this.rentalID);

        this.getApartment(params['rentalId']);
      });
    
  }

  getApartment(apartmentId: string) {
    this.mainService.getApartmentById(apartmentId).subscribe(
      (apartment: Rental) =>{
        this.Apartment=apartment;
      },
      (err)=>{
      },
      ()=>{
      });
  }

}
