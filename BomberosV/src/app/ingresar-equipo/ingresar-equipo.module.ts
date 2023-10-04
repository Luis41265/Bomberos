import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngresarEquipoPageRoutingModule } from './ingresar-equipo-routing.module';

import { IngresarEquipoPage } from './ingresar-equipo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IngresarEquipoPageRoutingModule
  ],
  declarations: [IngresarEquipoPage]
})
export class IngresarEquipoPageModule {}
