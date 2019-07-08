import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';



const routes: Routes = [
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent}
      ]


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule
    ],
    providers:[]
})

export class AuthModule {}