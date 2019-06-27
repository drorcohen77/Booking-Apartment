import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { MapService } from 'src/app/Services/map.service';



@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
        apiKey: 'AIzaSyBclVqXOcBlrfO2HfSxIXQo3Ll_iBuKER8'
      })
  ],
  providers: [MapService]
})
export class MapModule { }
