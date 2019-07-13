import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl:string = "/api/v1/users/register";
  private userUrl:string = "/api/v1/users/auth";

  constructor(private http:HttpClient) { }

  public registerUser(userObj: any): Observable<any> {
    console.log(userObj);
    return this.http.post(this.registerUrl,userObj);
  }

  public loginUser(userObj: any): Observable<any> {
    console.log(userObj);
    return this.http.post(this.userUrl,userObj).map(
      (token: any) => this.saveToken(token));
  }

  private saveToken(token: string): string {
    localStorage.setItem('TokenCurrentUser', token);

    return token;
  }

}
