import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MisEmergenciasPageRoutingModule} from './mis-emergencias-routing.module';

import {MisEmergenciasPage} from './mis-emergencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisEmergenciasPageRoutingModule
  ],
  declarations: [MisEmergenciasPage]
})
export class MisEmergenciasPageModule {
}
