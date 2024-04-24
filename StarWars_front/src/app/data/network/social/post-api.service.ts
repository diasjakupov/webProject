import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Post } from '../../../view/basicModels/post';
import { BASE_URL } from '../constant';
import { PostNetworkModel } from '../../models/PostNetworkModel';
import { AuthHeaders } from '../auth/auth_headers';

@Injectable({
  providedIn: 'root'
})
export class PostAPIService {

  constructor(private http: HttpClient) { }

  createPost(title: string, content: string): Observable<any>{
    const payload = {
      'title': title,
      'content': content
    }
    console.log(payload);
    
    const headers = new HttpHeaders().set(AuthHeaders.COMMENT_AUTH, AuthHeaders.COMMENT_AUTH)
    return this.http.post(`${BASE_URL}social/post/`, payload, {
      headers: headers
    })
  }

  getAllPosts(): Observable<Post[]>{
    return this.http.get<PostNetworkModel[]>(`${BASE_URL}social/posts/`).pipe(
      map((posts: PostNetworkModel[]) => posts.map(post => ({
        id: post.id,
        author: post.author.username,
        author_id: post.author.id,
        title: post.title,
        content: post.content,
        createdDate: new Date(post.created_date),
        likes: post.like_count,
        comments: post.comment_count,
        updated: post.updated_date ? new Date(post.updated_date) : null
      } as Post)))
    );
  }

}
