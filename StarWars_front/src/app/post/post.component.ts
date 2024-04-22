import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { PostAPIService } from '../data/network/social/post-api.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  constructor(private api: PostAPIService, private router: Router){}

  onSubmit(form: NgForm) {
    if(form.valid){
      this.api.createPost(form.value['title'], form.value['text']).subscribe({
        next: (res: any) => {
          this.router.navigate(['/forum']); 
        }
      });
    }
  }
}
