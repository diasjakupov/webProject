import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-comentate',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './comentate.component.html',
  styleUrl: './comentate.component.css'
})
export class ComentateComponent {

  onSubmit(f: NgForm) {

  }
}
