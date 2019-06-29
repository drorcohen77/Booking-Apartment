import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from 'src/app/Services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() Location: string;
  isPositionErorr:boolean =false;

  lat: number;
  lng: number;

  constructor(private mapService: MapService, private ref:ChangeDetectorRef) { }

  ngOnInit() {
  }

  mapReadyHandler() {
    console.log(this.Location);

    this.mapService.GeoCodeLocation(this.Location).subscribe(
      (coordinates) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;

        this.ref.detectChanges();
      },() => {
        this.isPositionErorr=true;
      }
    );
  }

}
