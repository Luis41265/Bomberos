import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-solicitar-emergencia',
  templateUrl: './solicitar-emergencia.page.html',
  styleUrls: ['./solicitar-emergencia.page.scss'],
})
export class SolicitarEmergenciaPage implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  enviarSolicitud(){

  }

  async  tomarFoto(){

  }

}
