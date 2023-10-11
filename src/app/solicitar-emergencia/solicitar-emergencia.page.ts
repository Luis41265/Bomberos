import { Component, OnInit } from '@angular/core';
import {  CameraResultType, CameraSource } from '@capacitor/camera';
import {EmergenciaService} from '../services/emergencia.service' ;

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emergencia } from '../Entidades/Emergencia';



@Component({
  selector: 'app-solicitar-emergencia',
  templateUrl: './solicitar-emergencia.page.html',
  styleUrls: ['./solicitar-emergencia.page.scss'],
})
export class SolicitarEmergenciaPage implements OnInit {

  emergencia: Emergencia = {
    Id_Emergencia:0,
    Id_Usuario:0,
    Id_Tipo_Emergencia:0,
    Ubicacion:'',
    Departamento:'',
    Municipio:'',
    Descripcion_Lugar: '',
    Cantidad_Personas_Afectadas: 0,
    Descripcion_Emergencia:'',
    Estado: true,
    created_at:'',
    updated_at:'',

  };


  emergencyForm = FormGroup;

  formErrors={
    'Id_Emergencia' : " ",
    'Id_Usuario' : " ",
    'Id_Tipo_Emergencia ' : " ",
    'Ubicacion' : " ",
    'Departamento' : " ",
    'Municipio' : " ",
    'Descripcion_Lugar' : " ",
    'Estado' : true,
    'created_at' : " ",
    'updated_at ' : " "
  }

  validationMessages={
    'Id_Usuario':{
      'required':'El Id Usuario es requerido',
      'valorZero':'El Id Usuario No Puede ser 0'
    },

    'Departamento':{
      'required':'El Departamento es requerido'
    },

    'Municipio':{
      'required':'El Municipio es requerido'
    },

    'Descripcion_Lugar':{
      'required':'La descripcion del lugar es requerida'
    },

    }
  emergency = {
    departamento: '',
    municipio: '',

  };

  constructor( private emergenciaService: EmergenciaService,
    private formBuilder: FormBuilder,
    private router : Router) { }

  ngOnInit() {

  }

  enviarSolicitud(){

  }

  async  tomarFoto(){

  }

}
