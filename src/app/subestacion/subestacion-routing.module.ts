import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SubestacionPage} from './subestacion.page';

const routes: Routes = [
  {
    path: '',
    component: SubestacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubestacionPageRoutingModule {
}
