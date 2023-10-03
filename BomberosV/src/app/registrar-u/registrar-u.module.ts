import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { RegistrarUPageRoutingModule } from './registrar-u-routing.module';

import { RegistrarUPage } from './registrar-u.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarUPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarUPage]
})
export class RegistrarUPageModule {}
