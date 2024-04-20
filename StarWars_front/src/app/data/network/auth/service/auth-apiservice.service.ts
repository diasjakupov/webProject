import { Injectable } from '@angular/core';
import { ACCESS, BASE_URL, REFRESH } from '../../constant';
import { HttpClient } from '@angular/common/http';
import { LocalStorageServiceService } from '../../localstorage/local-storage-service.service';
import { JWTResponse } from '../JWTResponse';
import { BehaviorSubject, Observable, catchError, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthAPIServiceService {
  private tokenGet = `${BASE_URL}token/`
  private tokenRefresh = `${BASE_URL}token/refresh/`
  private register_url = `${BASE_URL}users/all/`

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn = this.loggedIn.asObservable();

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
          this.loggedIn.next(true); 
          return true;
        }
        this.loggedIn.next(false);
        return false;
      }),
      catchError(error => {
        console.log(error);
        console.error('Login failed:', error);
        this.loggedIn.next(false);
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
    this.loggedIn.next(false);
  }

  private hasToken(): boolean {
    return !!this.localStorage.getItem(ACCESS) && !!this.localStorage.getItem(REFRESH);
  }
}
