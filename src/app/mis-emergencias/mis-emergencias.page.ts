import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-emergencias',
  templateUrl: './mis-emergencias.page.html',
  styleUrls: ['./mis-emergencias.page.scss'],
})
export class MisEmergenciasPage implements OnInit {
  emergenciasAtendidas: any[] = []; // Carga aquí las emergencias atendidas
  emergenciasSolicitadas: any[] = []; // Carga aquí las emergencias solicitadas

  constructor() { }

  ngOnInit() {
  }

}
