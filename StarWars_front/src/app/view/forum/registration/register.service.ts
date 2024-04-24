import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // For making API calls (optional)
import { BehaviorSubject } from 'rxjs'; // For reactive state management

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registeredInSubject = new BehaviorSubject<boolean>(false); // Observable for login state
  isLoggedIn$ = this.registeredInSubject.asObservable();

  constructor(private http: HttpClient) { } // Inject HttpClient for API calls (if needed)

  register(username: string, email:string, password: string): void {

  }

  // You can add other methods like:
  isLoggedIn(): boolean {
    return true;
  }
}

