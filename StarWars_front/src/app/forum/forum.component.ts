import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { PostComponent } from "../post/post.component";
import {BottomPostsComponent} from "../bottom-posts/bottom-posts.component";
import {Post} from "../basicModels/post";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    RouterLink,
    BottomPostsComponent
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  posts: Post[] = [
    { id: 1,
      author: 'John Doe',
      title: 'Why Damir is chort',
      content: 'Potomushto on damir',
      createdDate: new Date(),
      likes: 3,
      comments: 15,
      updated: null,
    },
    { id: 2,
      author: 'Johqwd',
      title: 'Why Damir is chordwt',
      content: 'Potomushto on damqwir',
      createdDate: new Date(),
      likes: 9,
      comments: 15,
      updated: null,
    },
  ];
  onSubmit(form: NgForm) {
    const newPost: Post = {
      id:3,
      author: form.value.nickname,
      title: form.value.title,
      content: form.value.content,
      createdDate: new Date(),
      likes: 0, // Initial values for likes and comments
      comments: 0,
      updated: null,
    };
    this.posts.push(newPost);
    form.reset(); // Reset the form after submission
  }
}
