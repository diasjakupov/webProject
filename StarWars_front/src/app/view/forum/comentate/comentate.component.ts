import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { CommentAPIService } from '../../../data/network/social/comment-api.service';
import { Comment } from '../../basicModels/comment';

@Component({
  selector: 'app-comentate',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './comentate.component.html',
  styleUrl: './comentate.component.css'
})
export class ComentateComponent {
  post?: number
  comment!: Comment
  comm_id?: number | null = null;


  constructor(private service: CommentAPIService, private route: ActivatedRoute,private router: Router){}

  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    this.post = Number(routeParams.get('post_id'));
    this.comm_id = Number(routeParams.get('comm_id'))

    if (this.comm_id) {
      this.loadComment(Number(this.comm_id));
    }else{
      this.comment = {
        id: 0,
        author: "",
        post: 0,
        author_id: 0,
        content: "",
        createdDate: new Date(),
        updated: new Date()
      } 
    }
  }

  loadComment(id: number){
    this.service.getCommentById(id).subscribe((data)=>this.comment = data)
  }

  onSubmit(f: NgForm) {
    if(f.valid){
      if(this.comm_id){
        this.service.updateComment(this.comm_id, f.value["comment"]).subscribe({
          next: (res: any) => {
            this.router.navigate(['/forum']); 
          }
        });
      }else{
        this.service.createComment(this.post!!, f.value["comment"]).subscribe({
          next: (res: any) => {
            this.router.navigate(['/forum']); 
          }
        });
      }
    }
  }
}
