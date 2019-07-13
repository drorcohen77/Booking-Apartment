import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage:string = '';

  constructor(private fb: FormBuilder, private  AuthService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initForm();

    this.route.params.subscribe((params) => {
      if(params['registered'] === 'success') {
        
        this.notifyMessage = 'You have been successfuly registered, you can login now';
      }
    });
  }

  initForm() {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      password:['',Validators.required]
    })
  }

  IsInvalidForm(fieldName):boolean {
    return this.loginForm.controls[fieldName].invalid && (this.loginForm.controls[fieldName].dirty || this.loginForm.controls['email'].touched)

  }

  IsRequired(fieldName):boolean {
    return this.loginForm.controls[fieldName].errors.required
  }

  login() {
    console.log(this.loginForm.value);

    this.AuthService.loginUser(this.loginForm.value).subscribe(
    (token) =>{
      console.log('Login Succeded');
      console.log(token);
      
      this.router.navigate(['rentals']);
    },
    (err) =>{
      this.errors = err.error.errors;
      console.log(this.errors);
    });
    
  }

}
