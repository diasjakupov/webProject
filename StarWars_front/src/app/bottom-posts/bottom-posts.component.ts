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
  author: string = 'Bakytzhan' ;
  title: string ='Chort li Damir?' ;
  content: string = 'Estestvenno';
  createdDate: Date = new Date();
  likes: number = 0;
  comments: number = 0 ;
  text: string = '';
  updated: null | undefined;

}
