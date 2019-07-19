import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rental-list-item',
  templateUrl: './rental-list-item.component.html',
  styleUrls: ['./rental-list-item.component.scss']
})
export class RentalListItemComponent implements OnInit {

@Input() apartment: any;

public Path:string ='/rentals';

  constructor() { }

  ngOnInit() {
    
  }

}
