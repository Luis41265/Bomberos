import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MiInformacionPageRoutingModule} from './mi-informacion-routing.module';

import {MiInformacionPage} from './mi-informacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiInformacionPageRoutingModule
  ],
  declarations: [MiInformacionPage]
})
export class MiInformacionPageModule {
}
