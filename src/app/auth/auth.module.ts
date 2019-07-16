import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';
import { AuthGuard } from '../Services/auth.guard';



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
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[
        AuthService,
        AuthGuard
    ]
})

export class AuthModule {}