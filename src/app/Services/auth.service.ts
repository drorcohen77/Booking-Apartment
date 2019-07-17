import { JwtHelperService } from '@auth0/angular-jwt';
const jwt = new JwtHelperService();

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import 'rxjs/Rx'

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private decodedToken;
  

  private registerUrl:string = "/api/v1/users/register";
  private userUrl:string = "/api/v1/users/auth";

  constructor(private http:HttpClient) {
   
    this.decodedToken = JSON.parse(localStorage.getItem('TokenCurrentUser')) || new DecodedToken();
    console.log(this.decodedToken);
   }

  private saveToken(token: string): string {
    
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('TokenCurrentUser', token);
    localStorage.setItem('TokentUser', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp)
   }

  public logout() {
    localStorage.removeItem('TokenCurrentUser');
    localStorage.removeItem('TokentUser');

    this.decodedToken = new DecodedToken();
  }
   

  public registerUser(userObj: any): Observable<any> {
    console.log(userObj);
    return this.http.post(this.registerUrl,userObj);
  }

  public loginUser(userObj: any): Observable<any> {
    console.log(userObj);
    return this.http.post(this.userUrl,userObj).map(
      (token: any) => this.saveToken(token));
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getAuthToken(): string {
    return localStorage.getItem('TokenCurrentUser');
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

}
