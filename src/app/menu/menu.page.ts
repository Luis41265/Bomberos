import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {RolService} from "../services/rol.service";
import {DetalleatencionService} from "../services/detalleatencion.service";
import {DetalleEquipo} from "../Entidades/DetalleEquipo";
import {DetalleequipoService} from "../services/detalleequipo.service";
import {EmergenciaService} from "../services/emergencia.service";
import {EquipoatencionService} from "../services/equipoatencion.service";
import {NotificacionService} from "../services/notificacion.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  constructor(private router: Router, private rolservice:RolService,
   private detalleatencionservice : DetalleatencionService,
  private detalleequiposervice : DetalleequipoService,
              private emergenciaservice : EmergenciaService,
              private equipoatencionservice : EquipoatencionService,
              //private notificacionservice: NotificacionService
  ) {
    this.rolservice.obtenerRoles();
    this.detalleatencionservice.obtenerDetalleAtencion();
    this.equipoatencionservice.obtenerEquipoAtencion();
    this.emergenciaservice.obtenerEmergencias();
    //this.notificacionservice.obtenerNotificacion();
    this.detalleequiposervice.obtenerDetalleEquipo();
  }


  ngOnInit() {
  }

  solicitarApoyo() {
    this.router.navigate(['/solicitar-emergencia']);
  }

  navegar() {

  }

  cerrarApp() {
    this.router.navigate(['/login']);
  }

}
