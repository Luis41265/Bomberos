import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
}from '@angular/forms';

@Component({
  selector: 'app-tipos-emergencias',
  templateUrl: './tipos-emergencias.page.html',
  styleUrls: ['./tipos-emergencias.page.scss'],
})
export class TiposEmergenciasPage implements OnInit {
  emergency = {
    name: '',
    priority: '',
    color: '',
    status: '',
  };
  constructor() { }

  ngOnInit() {
  }

  registrartipoEmergencia(){

  }
}
