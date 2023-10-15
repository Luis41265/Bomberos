import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {IngresarEquipoPageRoutingModule} from './ingresar-equipo-routing.module';

import {IngresarEquipoPage} from './ingresar-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IngresarEquipoPageRoutingModule
  ],
  declarations: [IngresarEquipoPage]
})
export class IngresarEquipoPageModule {
}
