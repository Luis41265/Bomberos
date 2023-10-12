import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegistrarUPage} from './registrar-u.page';

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
export class RegistrarUPageRoutingModule {
}
