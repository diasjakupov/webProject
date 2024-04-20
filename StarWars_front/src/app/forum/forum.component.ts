import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
