import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/Services/rental.model';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental;
  rentalCategories = Rental.CATEGORIES;
  errors: any[] = [];

  constructor(private mainService: MainServiceService,private router: Router) { }

  handleImageChannge() {
    this.newRental.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image/jpeg"
  }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    this.mainService.createRental(this.newRental).subscribe(
      (rental: Rental)=>{
        this.router.navigate([`/rentals/${rental._id}`]);
      },
      (errorResponse: HttpErrorResponse)=> {
        this.errors = errorResponse.error.errors;
      }
    );
  }

}
