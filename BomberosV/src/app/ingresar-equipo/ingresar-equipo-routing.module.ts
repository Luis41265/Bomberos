import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngresarEquipoPage } from './ingresar-equipo.page';

const routes: Routes = [
  {
    path: '',
    component: IngresarEquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresarEquipoPageRoutingModule {}
