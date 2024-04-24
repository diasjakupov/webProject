import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router"
import { CommonModule } from '@angular/common';
import { BottomPostService } from '../../../data/network/social/bottom-post.service';
import { Post } from '../../basicModels/post';
import { PostAPIService } from '../../../data/network/social/post-api.service';

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

  constructor(private service: PostAPIService, private bottomService: BottomPostService) {}

  ngOnInit() {
    this.service.getAllPosts().subscribe((data)=> this.posts = data)
  }

  like(post_id: number){
    console.log(1)
    this.bottomService.likePost(post_id).subscribe()
  }
}
