import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NotificacionPageRoutingModule} from './notificacion-routing.module';

import {NotificacionPage} from './notificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NotificacionPageRoutingModule
  ],
  declarations: [NotificacionPage]
})
export class NotificacionPageModule {
}
