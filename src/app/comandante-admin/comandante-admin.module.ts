import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ComandanteAdminPageRoutingModule} from './comandante-admin-routing.module';

import {ComandanteAdminPage} from './comandante-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComandanteAdminPageRoutingModule
  ],
  declarations: [ComandanteAdminPage]
})
export class ComandanteAdminPageModule {
}
