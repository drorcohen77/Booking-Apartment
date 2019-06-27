import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geoCoder;

  constructor() { }

  public GeoCodeLocation(location: string): Observable<any> {
    console.log(location);

    this.geoCoder = new (<any>window).google.maps.Geocoder();

    return new Observable((observer) => {

      this.geoCoder.geocode({address: location}, (result,status) => {
        console.log(status);

        if (status=== 'OK') {
          const geometry = result[0].geometry.location;
          observer.next({lat: geometry.lat(), lng: geometry.lng()});
          }else {
            observer.error('Location could not be geocoded');
          };
      });

    });
  }

}
