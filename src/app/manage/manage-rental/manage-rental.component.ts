import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { Rental } from 'src/app/Services/rental.model';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

   public rentalsManage: Rental[];
   public errors: any[] = [];

  constructor(private mainService: MainServiceService) { }

  ngOnInit() {

    this.mainService.getRentalsManage().subscribe(
      (RentalsManage: Rental[]) =>{
        this.rentalsManage = RentalsManage;
        console.log(this.rentalsManage)
      },
      (errorsResponse: HttpErrorResponse) => {
      this.errors = errorsResponse.error.errors;
      }
    );

  }
  

}
