import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { User } from './user.model';




@Injectable()
export class UserService {
  user:User
   rootUrl = 'https://localhost:44306';

  constructor(private http: HttpClient) { }
  userAuthentication(userName,password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  }
  getUserClaims(){
    return  this.http.get(this.rootUrl+'/api/Account/GetUserClaims');
   }
 
}
