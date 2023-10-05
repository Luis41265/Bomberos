import { Component, OnInit } from '@angular/core';
import {  CameraResultType, CameraSource } from '@capacitor/camera';




@Component({
  selector: 'app-solicitar-emergencia',
  templateUrl: './solicitar-emergencia.page.html',
  styleUrls: ['./solicitar-emergencia.page.scss'],
})
export class SolicitarEmergenciaPage implements OnInit {
  emergency = {
    departamento: '',
    municipio: '',

  };

  constructor() { }

  ngOnInit() {
  }

  enviarSolicitud(){

  }

  async  tomarFoto(){

  }

}
