import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from "../basicModels/post";
import { Comment} from "../basicModels/comment";
import { Like } from "../basicModels/like"
import { AuthHeaders } from '../data/network/auth/auth_headers';

@Injectable({
  providedIn: 'root'
})
export class BottomPostService {

  constructor(private http: HttpClient) {}

  private baseUrl = 'http://127.0.0.1:8000/api/social/';

  // **Get All Posts:**
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'posts/')
      .pipe(
        catchError(this.handleError)
      );
  }

  // **Get Comments for a Post:**
  getComments(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + 'comments/' + postId + '/')
      .pipe(
        catchError(this.handleError)
      );
  }

  // **Get Likes for a Post:**
  getLikes(postId: number): Observable<Like[]> {
    return this.http.get<Like[]>(this.baseUrl + 'likes/' + postId + '/')
      .pipe(
        catchError(this.handleError)
      );
  }

  // **Create a Post:** (assuming authentication is handled elsewhere)
  createPost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Post>(this.baseUrl + 'posts/', post, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // **Like a Post:** (assuming authentication is handled elsewhere)
  likePost(postId: number): Observable<any> {
    const headers = {
      headers: new HttpHeaders().set(AuthHeaders.LIKE_AUTH, AuthHeaders.LIKE_AUTH)
    };
    console.log(this.baseUrl + 'like/')
    const data = { 'post_id': postId };
    return this.http.post(this.baseUrl + 'like/', data, headers)
  }

  // **Update a Post:** (assuming authentication and authorization are handled elsewhere)
  updatePost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = this.baseUrl + 'posts/' + post.id + '/';
    return this.http.put<Post>(url, post, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  // **Delete a Post:** (assuming authentication and authorization are handled elsewhere)
  deletePost(postId: number): Observable<any> {
    const url = this.baseUrl + 'posts/' + postId + '/';
    return this.http.delete<any>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // **Error Handling:**
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error occurred. Handle it accordingly.
      errorMessage = 'An error occurred: ' + error.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
