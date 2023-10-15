import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SolicitarEmergenciaPageRoutingModule} from './solicitar-emergencia-routing.module';

import {SolicitarEmergenciaPage} from './solicitar-emergencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SolicitarEmergenciaPageRoutingModule
  ],
  declarations: [SolicitarEmergenciaPage]
})
export class SolicitarEmergenciaPageModule {
}
