import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BASE_URL } from '../constant';
import { Post } from '../../../view/basicModels/post';
import { AuthHeaders } from '../auth/auth_headers';


@Injectable({
  providedIn: 'root'
})
export class BottomPostService {

  constructor(private http: HttpClient) {}

  private baseUrl = `${BASE_URL}social/`;

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'posts/')
      .pipe(
        catchError(this.handleError)
      );
  }

  likePost(postId: number): Observable<any> {
    const headers = {
      headers: new HttpHeaders().set(AuthHeaders.LIKE_AUTH, AuthHeaders.LIKE_AUTH)
    };
    console.log(this.baseUrl + 'like/')
    const data = { 'post_id': postId };
    return this.http.post(this.baseUrl + 'like/', data, headers)
  }

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
