import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {ApirestService} from "./apirest.service";
import {Router} from '@angular/router';
import {throwError} from "rxjs";
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorServiceService implements HttpInterceptor {

  constructor(private apirest: ApirestService,
              private router: Router) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.apirest.getAuthorizationToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    // send cloned request with header to the next handler.
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


}
