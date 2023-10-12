import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ingresar-equipo',
  templateUrl: './ingresar-equipo.page.html',
  styleUrls: ['./ingresar-equipo.page.scss'],
})
export class IngresarEquipoPage implements OnInit {
  equipo = {
    nombre: '',
    estado: '',
    cantidad: 0,
  }

  constructor() {
  }

  ngOnInit() {
  }

  guardarEquipo() {

  }

}
