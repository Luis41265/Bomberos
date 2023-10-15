import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {ApirestService} from "./apirest.service";
import {Router} from '@angular/router';
import {Observable, throwError} from "rxjs";
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor {

  constructor(private apirest: ApirestService,
              private router: Router) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let i = 0;
    // Get the auth token from the service.
    const authToken = this.apirest.getAuthorizationToken();
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    // send cloned request with header to the next handler.
    //return this.nextHandler(authReq, next, i);
    return next.handle(authReq).pipe(
      catchError(err => {
          // onError
          console.log(err);
          if (err instanceof HttpErrorResponse) {
            console.log(err.status);
            console.log(err.statusText);
            if (err.status === 401) {
              this.apirest.presentAlert();
              this.router.navigate(['/login']);
            }
          }
          return throwError(err);
        }
      )
    );

  }

  private nextHandler(req: HttpRequest<any>, next: HttpHandler, contador: number): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(data => {
        console.log("Respuesta Obtenida interceptor: ", data);
        if (data instanceof HttpErrorResponse) {
          console.log(data.status);
          console.log(data.statusText);
          if (data.status === 401) {
            this.apirest.presentAlert();
            this.router.navigate(['/login']);
          }
          return throwError(data);
        }
        /*if(contador<10){
          contador++;
          return this.nextHandler(req, next, contador);
        }*/
        return next.handle(req);
      }
    );
  }


}
