import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUser } from '../user-profile/user.interface';




@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor( private http: HttpClient) { }
  userId!: string

  getUser(): Observable<IUser>{
    return this.http.get<IUser>(`/user-profile/${this.userId}`)
  }

  loginUser(loginData) {
    return this.http.post('/login', loginData)
  }
  registerUser(registerData){
    return this.http.post('/register', registerData)
  }

  setUserId(id:string){
    this.userId=id
  }

}
