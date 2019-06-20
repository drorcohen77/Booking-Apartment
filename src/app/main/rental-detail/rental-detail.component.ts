import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.sass']
})
export class RentalDetailComponent implements OnInit {

  private rentalID: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.rentalID=parseInt(this.route.snapshot.paramMap.get('rentalId'));
    // console.log(this.rentalID);

    this.route.params.subscribe(
      (params) => {
        this.rentalID = params['rentalId'];
        console.log(this.rentalID);
      });
    
  }

}
