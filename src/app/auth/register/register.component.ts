import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../Services/auth.service';

import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};
  errors: any[] = [];

  constructor(private AuthService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  register(){
    console.log(this.formData);

    this.AuthService.registerUser(this.formData).subscribe (
      (User: any) => {
      console.log(User);
      this.router.navigate(['/login', {registered: 'success'}])
      },
      (err) => {
        this.errors = err.error.errors;
        console.log('errorResponse')},
      () => {
      });

  }
}
    

      

