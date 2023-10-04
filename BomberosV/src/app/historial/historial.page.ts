import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
}from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historialEmergencias = [
    {
      titulo: 'Incendio en el centro de la ciudad',
      fecha: '15 de agosto de 2023',
      icono: 'flame', // Puedes usar iconos de Ionic
    },
    {
      titulo: 'Rescate en el río',
      fecha: '10 de julio de 2023',
      icono: 'boat',
    },
    // Agrega más elementos de historial aquí
  ];


  constructor() { }

  ngOnInit() {
  }

}
