import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
