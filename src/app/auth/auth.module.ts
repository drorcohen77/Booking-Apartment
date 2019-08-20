import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


import { AuthService } from '../Services/auth.service';
import { AuthGuard } from '../Services/auth.guard';
import { TokenInterceptor } from '../Services/token.interceptor';




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
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: TokenInterceptor,
        //     multi: true
        // }
    ]
})

export class AuthModule {}