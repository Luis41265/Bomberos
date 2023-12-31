import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TiposEmergenciasPage} from './tipos-emergencias.page';

const routes: Routes = [
  {
    path: '',
    component: TiposEmergenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposEmergenciasPageRoutingModule {
}
