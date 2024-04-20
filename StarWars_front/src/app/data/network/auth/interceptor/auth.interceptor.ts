import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { LocalStorageServiceService } from '../../localstorage/local-storage-service.service';
import { ACCESS, BASE_URL, REFRESH } from '../../constant';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private httpClient: HttpClient, private localStorage: LocalStorageServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.startsWith(BASE_URL)) {
      return next.handle(req);
    }

    if (req.headers.has('Skip-Interceptor')) {
      const newReq = req.clone({ headers: req.headers.delete('Skip-Interceptor') });
      return next.handle(newReq); 
    }
  
    const accessToken = this.localStorage.getItem(ACCESS);
    
    if (!accessToken) {
      return next.handle(req);  
    }

    return this.verifyAccessToken(accessToken).pipe(
      switchMap((isValid) => {
        if (isValid) {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          return next.handle(authReq);
        } else {
          return next.handle(req);
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(`An error occurred during HTTP interception: ${error}`));
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
        catchError((error: HttpErrorResponse) => {
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
                return throwError(() => new Error(`An error occurred during refreshing: ${error}`));
              })
            );
          }
          return of(false);  
        })
      );
  }

  refreshAccessToken(token: string): Observable<any> { 
    return this.httpClient.post<any>(`${BASE_URL}/token/refresh`, { "token": token }, { headers: { 'Skip-Interceptor': 'true' } });
  }
}

