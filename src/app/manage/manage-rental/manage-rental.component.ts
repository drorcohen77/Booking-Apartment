import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MainServiceService } from 'src/app/Services/main-service.service';
import { Rental } from 'src/app/Services/rental.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

   public rentalsManage: Rental[];
   public errors: any[] = [];
   public rentalDeleteIndex:number;
   public deleteStatus: boolean = false;

  constructor(private mainService: MainServiceService, private toastr: ToastrService) { }

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

  deleteRental(rentalId: string) {

    this.mainService.deleteRental(rentalId).subscribe(
      () =>{
        this.deleteStatus = true;
        this.rentalsManage.splice(this.rentalDeleteIndex,1);
        this.rentalDeleteIndex = undefined;
        
      },
      (errorsResponse: HttpErrorResponse) => {
        this.toastr.error(errorsResponse.error.errors[0].detail,'Faild!');
        }
    ) 
  }
  
  

}
