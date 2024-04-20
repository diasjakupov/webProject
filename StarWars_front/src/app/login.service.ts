import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // For making API calls (optional)
import { BehaviorSubject } from 'rxjs'; // For reactive state management

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInSubject = new BehaviorSubject<boolean>(false); // Observable for login state
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient) { } // Inject HttpClient for API calls (if needed)

  login(username: string, password: string): boolean {
    // Simulate login logic (replace with your actual authentication mechanism)
    if (username === 'user' && password === 'password') {
      this.loggedInSubject.next(true);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    // Simulate logout logic (replace with your actual logout mechanism)
    this.loggedInSubject.next(false);
  }

  // You can add other methods like:
  isLoggedIn(): boolean {
    return this.loggedInSubject.getValue();
  }
}

