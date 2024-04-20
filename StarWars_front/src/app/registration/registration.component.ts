import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegisterComponent {
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
