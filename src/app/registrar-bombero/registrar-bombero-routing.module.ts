import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegistrarBomberoPage} from './registrar-bombero.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarBomberoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarBomberoPageRoutingModule {
}
