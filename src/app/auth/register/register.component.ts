import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formData: any = {};

  constructor(private AuthService: AuthService) { }

  ngOnInit() {
  }

  register(){
    console.log(this.formData);

    this.AuthService.registerUser(this.formData).subscribe (
      (User: any) => {
      console.log(User);
      },
      (err) => {console.log('errorResponse')},
      () => {
      });
  }

}
