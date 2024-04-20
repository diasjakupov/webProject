import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import { AuthAPIServiceService } from '../data/network/auth/service/auth-apiservice.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegisterComponent {
  error: string | null = null;


  constructor(private auth: AuthAPIServiceService, private router: Router){

  }
  onSubmit(form: NgForm) {
    this.auth.register(form.value["username"], form.value["password"], form.value["email"]).subscribe((isSucced) => {
      if (isSucced) {
        this.router.navigate(['/login']);
      } else {
        this.error = "Invalid username or password"; 
      }
    })
  }
}
