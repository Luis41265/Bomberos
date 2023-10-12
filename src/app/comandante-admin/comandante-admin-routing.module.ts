import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ComandanteAdminPage} from './comandante-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ComandanteAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComandanteAdminPageRoutingModule {
}
