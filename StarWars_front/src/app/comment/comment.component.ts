import { Component } from '@angular/core';
import { Comment } from "../basicModels/comment";
import {RouterLink} from "@angular/router";
import {Post} from "../basicModels/post";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  comments: Comment[] = [
    {
      author: 'Mamkin Progromist',
      post: 'Why Damir is chort',
      content: 'On ludschy chort',
      createdDate: new Date(),
      updated: null,
    },
    {
      author: 'Dias',
      post: 'Why Damir is chordwt',
      content: 'Potomushto on Damir',
      createdDate: new Date(),
      updated: null,
    },
  ];
}
