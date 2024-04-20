import { Injectable } from '@angular/core';
import { BASE_URL } from '../../constant';
import { HttpClient } from '@angular/common/http';
import { LocalStorageServiceService } from '../../localstorage/local-storage-service.service';
import { JWTResponse } from '../JWTResponse';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIServiceService {
  private tokenGet = `${BASE_URL}token/`
  private tokenRefresh = `${BASE_URL}token/refresh/`
  private register_url = `${BASE_URL}users/all/`


  constructor(private httpClient: HttpClient, private localStorage: LocalStorageServiceService) {}

  login(username: string, password: string): Observable<boolean> {
    console.log("login");

    return this.httpClient.post<JWTResponse>(this.tokenGet, {
      username: username,
      password: password
    }).pipe(
      map(tokens => {
        console.log(tokens);
        
        if (tokens.access && tokens.refresh) {
          this.localStorage.setItem("access", tokens.access);
          this.localStorage.setItem("refresh", tokens.refresh);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.log(error);
        console.error('Login failed:', error);
        return of(false); // Handle errors or propagate them as needed
      })
    );
  }

  register(username: string, password: string, email: string): Observable<boolean>{
    return this.httpClient.post(this.register_url, {
      "username": username,
      "password": password,
      "email": email
    }).pipe(
      map(()=>{
        return true
      }),
      catchError(error => {
        console.log(error);
        console.error('Register failed:', error);
        return of(false); // Handle errors or propagate them as needed
      })
    );
  }

  logout(){
    this.localStorage.clear()
  }
}
