import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {RegistrarBomberoPageRoutingModule} from './registrar-bombero-routing.module';

import {RegistrarBomberoPage} from './registrar-bombero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarBomberoPageRoutingModule
  ],
  declarations: [RegistrarBomberoPage]
})
export class RegistrarBomberoPageModule {
}
