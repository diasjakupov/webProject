import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { PostComponent } from "../post/post.component";
import {BottomPostsComponent} from "../bottom-posts/bottom-posts.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    RouterLink,
    BottomPostsComponent,
    NgForOf
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {

  constructor(){}

}
