import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisEmergenciasPage } from './mis-emergencias.page';

const routes: Routes = [
  {
    path: '',
    component: MisEmergenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisEmergenciasPageRoutingModule {}
