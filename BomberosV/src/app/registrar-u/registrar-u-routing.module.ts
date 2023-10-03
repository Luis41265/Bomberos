import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarUPage } from './registrar-u.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarUPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarUPageRoutingModule {}
