import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-subestacion',
  templateUrl: './subestacion.page.html',
  styleUrls: ['./subestacion.page.scss'],
})
export class SubestacionPage implements OnInit {

  subestacion = {
    nombre: '',
    direccion: '',
    telefono: '',
    correoInstitucional: '',
    departamento: '',
    municipio: '',
    alcanceSur: '',
    alcanceNorte: '',
    alcanceEste: '',
    alcanceOeste: '',
    estado: 'activo', // Estado por defecto
  };

  constructor() {
  }

  ngOnInit() {
  }

  guardarSubestacion() {

  }
}
