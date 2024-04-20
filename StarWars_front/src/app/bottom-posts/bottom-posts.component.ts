import { Component } from '@angular/core';
import { User } from "../basicModels/user";

@Component({
  selector: 'app-bottom-posts',
  standalone: true,
  imports: [],
  templateUrl: './bottom-posts.component.html',
  styleUrl: './bottom-posts.component.css'
})
export class BottomPostsComponent {

  nickname: string = '' ;
  postTime: string = new Date().toLocaleString();
  commentsCount: number = 0;
  likesCount: number = 0 ;
  text: string = '';
  title: string = '';
}
