import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiposEmergenciasPageRoutingModule } from './tipos-emergencias-routing.module';

import { TiposEmergenciasPage } from './tipos-emergencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiposEmergenciasPageRoutingModule
  ],
  declarations: [TiposEmergenciasPage]
})
export class TiposEmergenciasPageModule {}
