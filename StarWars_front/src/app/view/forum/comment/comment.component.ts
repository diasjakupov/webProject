import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import { CommentAPIService } from '../../../data/network/social/comment-api.service';
import { Comment } from '../../basicModels/comment';

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

  comments?: Comment[]
  post?: number


  constructor(private service: CommentAPIService, private route: ActivatedRoute){}

  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    this.post = Number(routeParams.get('id'));
    this.service.getAllComments(this.post).subscribe((data)=>
    this.comments = data)
  }
}
