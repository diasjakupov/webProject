import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, of, EMPTY } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { LocalStorageServiceService } from '../../localstorage/local-storage-service.service';
import { ACCESS, BASE_URL, REFRESH } from '../../constant';
import { Router } from '@angular/router';
import { AuthHeaders } from '../auth_headers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private headers = Object.values(AuthHeaders).filter((item) => {
    return isNaN(Number(item));
  });

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageServiceService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!req.url.startsWith(BASE_URL)) {
      return next.handle(req);
    }

    if(!this.headers.some(header => req.headers.has(header))){
      return next.handle(req);
    }

    if (req.headers.has('Skip-Interceptor')) {
      const newReq = req.clone({ headers: req.headers.delete('Skip-Interceptor') });
      return next.handle(newReq); 
    }
    console.log("after skip");
    console.log(`${req.headers.keys()}`);

    const accessToken = this.localStorage.getItem(ACCESS);
    console.log("TEST: ", accessToken)
    if (!accessToken) {
      this.router.navigate(['/login']);
      return EMPTY
    }

    console.log("Intercept");
    
    return this.verifyAccessToken(accessToken).pipe(
      switchMap((isValid) => {   
        console.log(isValid);
             
        if (isValid) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.localStorage.getItem(ACCESS)}`
            }
          });
          console.log(authReq);
          
          return next.handle(authReq);
        } else {
          console.log(isValid);
          this.router.navigate(['/login']);
          return EMPTY
        }
      }),
      catchError((error) => {
        console.log("error")
        return EMPTY
      })
    );
  }

  verifyAccessToken(token: string): Observable<boolean> {
    return this.httpClient.post<HttpResponse<any>>(`${BASE_URL}token/verify/`, { "token": token },
    { 
      observe: 'response',
      headers: { 'Skip-Interceptor': 'true' }
    })
      .pipe(
        switchMap(res => {
          return of(res.status === 200);
        }),
        catchError((error) => {
          return this.handleTokenError(error)
        })
      );
  }

  private handleTokenError(error: HttpErrorResponse): Observable<boolean> {
    console.log(`error ${error.message}`);
    
    if (error.status === 401 || error.status === 403) {      
      return this.refreshAccessToken(this.localStorage.getItem(REFRESH) ?? '').pipe(
        switchMap(newAccess => {
          if (newAccess && newAccess.access) {
            this.localStorage.setItem(ACCESS, newAccess.access);
            return of(true);
          }
          return of(false);
        }), 
        catchError((error) => {
          console.log("in handle");
          return of(false)
        })
      );
    }
    return of(false);
  }

  refreshAccessToken(token: string): Observable<any> { 
    return this.httpClient.post<any>(`${BASE_URL}token/refresh/`, { "refresh": token }, { headers: { 'Skip-Interceptor': 'true' } });
  }
}

