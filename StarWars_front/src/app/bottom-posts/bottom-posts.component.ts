import { Component } from '@angular/core';
import { User } from "../basicModels/user";
import {Router, RouterLink} from "@angular/router"
import { PostAPIService } from '../data/network/social/post-api.service';
import { Post } from '../basicModels/post';
import { CommonModule } from '@angular/common';
import { BottomPostService } from './bottom-post.service';

@Component({
  selector: 'app-bottom-posts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './bottom-posts.component.html',
  styleUrl: './bottom-posts.component.css'
})
export class BottomPostsComponent {
  posts: Post[] | undefined

  constructor(private router: Router, private service: PostAPIService, private bottomService: BottomPostService) {}

  ngOnInit() {
    this.service.getAllPosts().subscribe((data)=> this.posts = data)
  }

  navigateToComments() {
    this.router.navigate(['/comments']); // Replace with your comments route
  }

  like(post_id: number){
    console.log(1)
    this.bottomService.likePost(post_id).subscribe()
  }
}
