import { Component } from '@angular/core';
import { User } from "../basicModels/user";
import {Router, RouterLink} from "@angular/router"

@Component({
  selector: 'app-bottom-posts',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './bottom-posts.component.html',
  styleUrl: './bottom-posts.component.css'
})
export class BottomPostsComponent {

  constructor(private router: Router) {}

  ngOnInit() {
    // ...
  }

  author: string = 'Bakytzhan' ;
  title: string ='Chort li Damir?' ;
  content: string = 'Estestvenno';
  createdDate: Date = new Date();
  likes: number = 0;
  comments: number = 0 ;
  text: string = '';
  updated: null | undefined;
  navigateToComments() {
    this.router.navigate(['/comments']); // Replace with your comments route
  }
}
