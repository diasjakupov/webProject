import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import { AuthAPIServiceService } from '../data/network/auth/service/auth-apiservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error: string | null = null;


  constructor(private authService: AuthAPIServiceService, private router: Router){}

  onSubmit(form: NgForm) {
    this.authService.login(form.value["username"], form.value["password"]).subscribe((isLogged) => {
      if (isLogged) {
        this.router.navigate(['/']);
      } else {
        this.error = "Invalid username or password";
      }
    });
  }
}
