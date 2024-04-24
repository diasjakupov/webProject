import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { CommentAPIService } from '../../../data/network/social/comment-api.service';

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

  constructor(private service: CommentAPIService, private route: ActivatedRoute,private router: Router){}

  ngOnInit(){
    const routeParams = this.route.snapshot.paramMap;
    this.post = Number(routeParams.get('id'));
  }

  onSubmit(f: NgForm) {
    if(f.valid){
      this.service.createComment(this.post!!, f.value["comment"]).subscribe({
        next: (res: any) => {
          this.router.navigate(['/forum']); 
        }
      });
    }
  }
}
