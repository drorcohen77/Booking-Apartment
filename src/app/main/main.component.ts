import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../Services/main-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private MainService:MainServiceService) { }

  ngOnInit() {
  }

}
