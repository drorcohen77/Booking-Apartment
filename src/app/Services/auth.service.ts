import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Url:string = "/api/v1/users/register";

  constructor(private http:HttpClient) { }

  public registerUser(userObj: any): Observable<any> {
    console.log(userObj);
    return this.http.post(this.Url,userObj);
  }

}
