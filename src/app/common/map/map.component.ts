import { Component, OnInit, Input } from '@angular/core';
import { MapService } from 'src/app/Services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() Location: string;

  lat: number;
  lng: number;

  constructor(private mapService: MapService) { }

  ngOnInit() {
  }

  mapReadyHandler() {
    console.log(this.Location);
    this.mapService.GeoCodeLocation(this.Location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
      });
      console.log(this.lat,this.lng);
  }

}
