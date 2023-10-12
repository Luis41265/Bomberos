import { Component, OnInit , ViewChild} from '@angular/core';
import {  CameraResultType, CameraSource } from '@capacitor/camera';
import {EmergenciaService} from '../services/emergencia.service' ;
import { AlertController } from '@ionic/angular';

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


  emergencyForm : FormGroup;

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

  @ViewChild('fform') registroFormDirective:any;

  public valorZero: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
        //console.log('Valor obtenido en el validador: '+valor);
        if(valor===0){
          return {valorZero:{value: control.value}};
        }
      return null;
  };

  constructor( private emergenciaService: EmergenciaService,
    private formBuilder: FormBuilder,
    private router : Router
    ,private alertController:AlertController,
    public fb: FormBuilder) { }



  ngOnInit() {  }

  createForm(): void {
    this.emergencyForm=this.fb.group({
      Id_Usuario: [0, [Validators.required, this.valorZero]],
      Id_Tipo_Emergencia: [0, [Validators.required, this.valorZero]],
      Departamento: ['', [Validators.required]],
      Municipio: ['', [Validators.required, this.valorZero]],
      Descripcion_Lugar: ['', [Validators.required, this.valorZero]],
      Cantidad_Personas_Afectadas: [0, [Validators.required, this.valorZero]],
      Descripcion_Emergencia: ['',[Validators.required,this.valorZero]],
      Estado: ['',[Validators.required,this.valorZero]]
    });

    this.emergencyForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //Resetear los mensajes de validacion

  }

    onValueChanged(data?:any):void{
      if(!this.emergencyForm){
        return;

      }
      const form = this.emergencyForm;

  for (const field in this.formErrors) {
    if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            this.formErrors[field] += messages[key] + ' ';
          }
        }
      }
    }
  }
}
  enviarSolicitud(){

  }

  async  tomarFoto(){

  }

}
