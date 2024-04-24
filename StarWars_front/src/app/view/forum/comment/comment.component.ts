import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import { CommentAPIService } from '../../../data/network/social/comment-api.service';
import { Comment } from '../../basicModels/comment';
import { LocalStorageServiceService } from '../../../data/network/localstorage/local-storage-service.service';
import { USER_ID } from '../../../data/network/constant';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf, NgIf
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  comments?: Comment[]
  post?: number
  userId?: number


  constructor(private service: CommentAPIService, private route: ActivatedRoute, private localStorage: LocalStorageServiceService){}


  ngOnInit(){
    this.userId = Number(this.localStorage.getItem(USER_ID) ?? -1)
    
    const routeParams = this.route.snapshot.paramMap;
    this.post = Number(routeParams.get('id'));
    this.service.getAllComments(this.post).subscribe((data)=>
    this.comments = data)
  }

  deleteComment(commentId: number) {
    this.service.deleteComment(commentId).subscribe()
  }
}
