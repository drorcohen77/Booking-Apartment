import { NgModule } from '@angular/core';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { MainComponent } from './main.component';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [
        MainComponent,
        RentalListComponent,
        RentalListItemComponent
    ],
    imports:[CommonModule]
})

export class MainModule {}