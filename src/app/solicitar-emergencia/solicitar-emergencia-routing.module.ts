import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SolicitarEmergenciaPage} from './solicitar-emergencia.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitarEmergenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitarEmergenciaPageRoutingModule {
}
