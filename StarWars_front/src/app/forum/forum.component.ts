import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
