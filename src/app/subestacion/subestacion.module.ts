import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SubestacionPageRoutingModule} from './subestacion-routing.module';

import {SubestacionPage} from './subestacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SubestacionPageRoutingModule
  ],
  declarations: [SubestacionPage]
})
export class SubestacionPageModule {
}
