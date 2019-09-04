import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/Services/rental.model';
import { MainServiceService } from 'src/app/Services/main-service.service';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;


  constructor(private mainService: MainServiceService) { }

  handleImageChannge() {
    this.newRental.image = "http://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image/jpeg"
  }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    this.mainService.createRental(this.newRental).subscribe(
      ()=>{

      },
      (err)=> {

      }
    );
  }

}
