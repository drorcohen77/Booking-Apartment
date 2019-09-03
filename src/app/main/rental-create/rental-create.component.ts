import { Component, OnInit } from '@angular/core';
import { Rental } from 'src/app/Services/rental.model';

@Component({
  selector: 'app-rental-create',
  templateUrl: './rental-create.component.html',
  styleUrls: ['./rental-create.component.scss']
})
export class RentalCreateComponent implements OnInit {

  newRental: Rental;

  constructor() { }

  ngOnInit() {
    this.newRental = new Rental();
    this.newRental.shared = false;
  }

  createRental() {
    console.log(this.newRental);
  }

}
