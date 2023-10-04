import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiInformacionPage } from './mi-informacion.page';

const routes: Routes = [
  {
    path: '',
    component: MiInformacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiInformacionPageRoutingModule {}
