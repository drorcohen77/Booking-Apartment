import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainServiceService } from '../Services/main-service.service';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RgisterComponent } from './rgister/rgister.component';



const routes: Routes = [
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RgisterComponent}
      ]
    
@NgModule({
    declarations: [
        LoginComponent,
        RgisterComponent
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        HttpClientModule
    ],
    providers:[MainServiceService]
})

export class AuthModule {}