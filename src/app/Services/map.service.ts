import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {CamelizePipe} from 'ngx-pipes';


@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geoCoder;
  private locationCache: any = {}


  constructor(private camlizePipe: CamelizePipe) { }

  private camelize(value: string): string {
    return this.camlizePipe.transform(value);
  }

  private Cachelocation(location: string,coordinates: any) {
    const camlizedLocation = this.camelize(location);

    this.locationCache[camlizedLocation] = coordinates;
  }

  private isLocationCached(location): boolean {
    return this.locationCache[this.camlizePipe.transform(location)]
  };

  public GeoCodeLocation(location: string): Observable<any> {
    console.log(location);

    this.geoCoder = new (<any>window).google.maps.Geocoder();

    return new Observable((observer) => {

      if (this.isLocationCached(location)) {

          observer.next(this.locationCache[this.camelize(location)]);
      }else{

        this.geoCoder.geocode({address: location}, (result,status) => {
          console.log(status);
          console.log(result[0].geometry);
          console.log(location);
  
          if (status=== 'OK') {
            const geometry = result[0].geometry.location;
  
            const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
            this.Cachelocation(location, coordinates);
  
            console.log(geometry);
            observer.next(coordinates);
            }else {
              observer.error('Location could not be geocoded');
            };
        });
      }

    });
  }

}

// private geoCodeLocation(location: string): Observable<any> {
    
//   if (!this.geoCoder) {
//     this.geoCoder = new (<any>window).google.maps.Geocoder();
//   }

//   return new Observable ((observer) => {
//     this.geoCoder.geocode({address: location}, (result,status) => {
//       console.log(status);
//       console.log(result[0].geometry);
//       console.log(location);

//       if (status=== 'OK') {
//         const geometry = result[0].geometry.location;

//         const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
//         this.Cachelocation(location, coordinates);

//         console.log(geometry);
//         observer.next(coordinates);
//         }else {
//           observer.error('Location could not be geocoded');
//         };
//     });
//   });
// }

// public getGeoLocation(location: string): Observable<any> {
//   console.log(location);

//     if (this.isLocationCached(location)) {

//       return Observable.of(this.locationCache[this.camelize(location)]);
//     }else{

//       return this.geoCodeLocation(location);
//     }
// }

// }
