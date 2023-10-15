import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {from, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {AlertController, Platform} from '@ionic/angular';

import {CapacitorHttp, HttpResponse} from '@capacitor/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  private token: string = "";

  /**
   * Url base del servidor donde se encuentran nuestros endpoints
   */
  private url: string = "http://localhost:8080/PgCBV-1/api/";

  constructor(private http: HttpClient, public platform: Platform
    , private alertController: AlertController,
              private router: Router) {
    console.log('Servicio HTTP Inicializado:');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sesión Caducada',
      //subHeader: 'Important message',
      message: 'Vuelva a iniciar sesión por favor!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  setToken(token: string): void {
    console.log("Token recibido en el setToken: " + token);
    this.token = token;
    console.log('Seteo el token al servicio APIREST: ' + this.token);
  }

  getAuthorizationToken(): string {
    return 'Bearer ' + this.token;
  }

  get<T>(url: string): Observable<T> {
    url = this.url + url;
    let entidad: T;
    console.log("Url: " + url);
    if (this.platform.is('hybrid')) {
      const options = {
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthorizationToken()
        },
      };

      return from(CapacitorHttp.get(options))
        .pipe(map((response: HttpResponse) => {
          console.log("Resultado de consumir el RestAPI metodo GET " + url);
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          if ((response.status !== 200) && (response.status !== 201)) {
            console.log('La respuesta del servidor no ha sido la esperada');
            throw new Error(response.data);
          }
          console.log(response);
          entidad = response.data;
          console.log("Entidad obtenida como respuesta del servicio GET: " + entidad);
          return entidad;
        }));

    } else {
      return this.http.get<T>(url, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al consumir el servicio GET");
            console.log(err.json);
            return throwError(err);
          }
        )
      );
    }
  }

  post<T>(url: string, entidad: T): Observable<T> {
    url = this.url + url;
    console.log("Url: " + url);
    console.log("Entidad: " + JSON.stringify(entidad));
    if (this.platform.is('hybrid')) {
      const options = {
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthorizationToken()
        },
        data: entidad,
      };

      return from(CapacitorHttp.post(options))
        .pipe(map((response: HttpResponse) => {
          console.log("Resultado de consumir el RestAPI metodo POST " + url);
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          if ((response.status !== 200) && (response.status !== 201)) {
            console.log('La respuesta del servidor no ha sido la esperada');
            throw new Error(response.data);
          }
          console.log(response);
          entidad = response.data;
          console.log("Entidad obtenida como respuesta del servicio POST: " + entidad);
          return entidad;
        }));

    } else {
      return this.http.post<T>(url, entidad, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al consumir el servicio POST");
            console.log(err.json);
            return throwError(err);
          }
        )
      );
    }
  }


  put<T>(url: string, entidad: T): Observable<T> {
    url = this.url + url;
    console.log("Url: " + url);
    console.log("Entidad: " + JSON.stringify(entidad));
    console.log(entidad);
    if (this.platform.is('hybrid')) {
      const options = {
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthorizationToken()
        },
        //data: entidad,
        data: entidad,
      };

      return from(CapacitorHttp.put(options))
        .pipe(map((response: HttpResponse) => {
          console.log("Resultado de consumir el RestAPI metodo PUT " + url);
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          if ((response.status !== 200) && (response.status !== 201)) {
            console.log('La respuesta del servidor no ha sido la esperada');
            throw new Error(response.data);
          }
          console.log(response);
          entidad = response.data;
          console.log("Entidad obtenida como respuesta del servicio PUT: " + entidad);
          return entidad;
        }));

    } else {
      /*return this.http.put<T>(url, entidad, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al consumir el servicio PUT");
            console.log(err.json);
            return throwError(err);
          }
        )
      );*/
      return this.http.put<T>(url, entidad, this.httpOptions);
    }
  }

  delete<T>(url: string, entidad: T): Observable<T> {
    url = this.url + url;
    console.log("Url: " + url);
    console.log("Entidad: " + JSON.stringify(entidad));
    if (this.platform.is('hybrid')) {
      const options = {
        url: url,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.getAuthorizationToken()
        },
        data: entidad,
      };

      return from(CapacitorHttp.post(options))
        .pipe(map((response: HttpResponse) => {
          console.log("Resultado de consumir el RestAPI metodo DELETE " + url);
          if (response.status === 401) {
            console.log("Token caducado");
            this.presentAlert();
            this.router.navigate(['/login']);
          }
          if ((response.status !== 200) && (response.status !== 201)) {
            console.log('La respuesta del servidor no ha sido la esperada');
            throw new Error(response.data);
          }
          console.log(response);
          entidad = response.data;
          console.log("Entidad obtenida como respuesta del servicio DELETE: " + entidad);
          return entidad;
        }));

    } else {
      return this.http.post<T>(url, entidad, this.httpOptions).pipe(
        catchError(err => {
            // onError
            console.log("Error capturado al consumir el servicio DELETE");
            console.log(err.json);
            return throwError(err);
          }
        )
      );
    }
  }


}
