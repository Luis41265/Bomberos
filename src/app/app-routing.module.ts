import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {

    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },

  {
    path: 'registrar-u',
    loadChildren: () => import('./registrar-u/registrar-u.module').then( m => m.RegistrarUPageModule)
  },
  {
    path: 'notificacion',
    loadChildren: () => import('./notificacion/notificacion.module').then( m => m.NotificacionPageModule)
  },
  {
    path: 'solicitar-emergencia',
    loadChildren: () => import('./solicitar-emergencia/solicitar-emergencia.module').then( m => m.SolicitarEmergenciaPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'mis-emergencias',
    loadChildren: () => import('./mis-emergencias/mis-emergencias.module').then( m => m.MisEmergenciasPageModule)
  },
  {
    path: 'registrar-bombero',
    loadChildren: () => import('./registrar-bombero/registrar-bombero.module').then( m => m.RegistrarBomberoPageModule)
  },
  {
    path: 'ingresar-equipo',
    loadChildren: () => import('./ingresar-equipo/ingresar-equipo.module').then( m => m.IngresarEquipoPageModule)
  },
  {
    path: 'subestacion',
    loadChildren: () => import('./subestacion/subestacion.module').then( m => m.SubestacionPageModule)
  },
  {
    path: 'tipos-emergencias',
    loadChildren: () => import('./tipos-emergencias/tipos-emergencias.module').then( m => m.TiposEmergenciasPageModule)
  },
  {
    path: 'mi-informacion',
    loadChildren: () => import('./mi-informacion/mi-informacion.module').then( m => m.MiInformacionPageModule)
  },  {
    path: 'comandante-admin',
    loadChildren: () => import('./comandante-admin/comandante-admin.module').then( m => m.ComandanteAdminPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
