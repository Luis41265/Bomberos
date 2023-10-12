import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ApirestService} from "./services/apirest.service";
import {TokenInterceptorServiceService} from "./services/token-interceptor-service.service";
import {CameraService} from "./services/camera.service";
import {GpsService} from "./services/gps.service";
import {DetalleatencionService} from "./services/detalleatencion.service";
import {EmergenciaService} from "./services/emergencia.service";
import {EquipoatencionService} from "./services/equipoatencion.service";
import {FotografiaService} from "./services/fotografia.service";
import {NotificacionService} from "./services/notificacion.service";
import {RolService} from "./services/rol.service";
import {SubestacionService} from "./services/subestacion.service";
import {TipoemergenciaService} from "./services/tipoemergencia.service";
import {UsuarioService} from "./services/usuario.service";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorServiceService,
      multi: true
    },
    ApirestService,
    CameraService,
    GpsService,
    DetalleatencionService,
    EmergenciaService,
    EquipoatencionService,
    FotografiaService,
    NotificacionService,
    RolService,
    SubestacionService,
    TipoemergenciaService,
    UsuarioService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
