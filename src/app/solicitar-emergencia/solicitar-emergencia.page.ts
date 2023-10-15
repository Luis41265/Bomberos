import {Component, OnInit, ViewChild} from '@angular/core';
import {EmergenciaService} from '../services/emergencia.service';
import {AlertController} from '@ionic/angular';

import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Emergencia} from '../Entidades/Emergencia';


@Component({
  selector: 'app-solicitar-emergencia',
  templateUrl: './solicitar-emergencia.page.html',
  styleUrls: ['./solicitar-emergencia.page.scss'],
})
export class SolicitarEmergenciaPage implements OnInit {

  formularioEmergencia: FormGroup;

  @ViewChild('fform') materialFormDirective: any;

  emergencia: Emergencia = {
    Id_Emergencia: 0,
    Id_Usuario: 0,
    Id_Tipo_Emergencia: 0,
    Ubicacion: '',
    Departamento: '',
    Municipio: '',
    Descripcion_Lugar: '',
    Cantidad_Personas_Afectadas: 0,
    Descripcion_Emergencia: '',
    Estado: true,
    // created_at: '',
    // updated_at: '',

  };




  formErrors = {
    // 'Id_Emergencia': " ",
    // 'Id_Usuario': " ",
    // 'Id_Tipo_Emergencia ': " ",
    'Ubicacion': " ",
    'Departamento': " ",
    'Municipio': " ",
    'Descripcion_Lugar': " ",
    'Cantidad_Personas_Afectadas' : "" ,
    'Descripcion_Emergencia': "",
    'Estado': true,
    // 'created_at': " ",
    // 'updated_at ': " "
  }

  validationMessages = {
    // 'Id_Usuario': {
    //   'required': 'El Id Usuario es requerido',
    //   'valorZero': 'El Id Usuario No Puede ser 0'
    // },

    'Departamento': {
      'required': 'El Departamento es requerido'
    },

    'Municipio': {
      'required': 'El Municipio es requerido'
    },

    'Descripcion_Lugar': {
      'required': 'La descripcion del lugar es requerida'
    },
    'Cantidad_Personas_Afectadas': {
      'required': 'la cantidad de personas afectadas es requerida'
    },
    'Descripcion_Emergencia?: ': {
      'required': 'la Descripcion  de emergencia es requerida'
    },

  }
  // emergency = {
  //   departamento: '',
  //   municipio: '',

  // };

  constructor(private fb: FormBuilder, private router: Router,
    private alertController: AlertController, private emergenciaservice: EmergenciaService) {
//this.emergencia = this.emergenciaservice.();
this.createForm();
}



  // public valorZero: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const valor = control.value;
  //   //console.log('Valor obtenido en el validador: '+valor);
  //   if (valor === 0) {
  //     return {valorZero: {value: control.value}};
  //   }
  //   return null;
  // };

  ngOnInit() {
    console.log("Formulario, ", this.formularioEmergencia)
    this.formularioEmergencia.valueChanges.pipe().subscribe(
      data => {
        //console.log("Data que validara el formulario: ", data);
        this.onValueChanged(data);
      }
    );
    console.log("Formulario, ", this.formularioEmergencia)
    console.log('Ha Suscrito el formulario')
  }

  createForm(): void {
    this.formularioEmergencia = this.fb.group({
      Ubicacion: [this.emergencia.Ubicacion, [Validators.required]],
      Departamento: [this.emergencia.Departamento, [Validators.required]],
      Municipio: [this.emergencia.Municipio, [Validators.required, Validators.email]],
      Descripcion_Lugar: [this.emergencia.Descripcion_Lugar, [Validators.required]],
      Descripcion_Emergencia: [this.emergencia.Descripcion_Emergencia, [Validators.required]],
      Cantidad_Personas_Afectadas:  [this.emergencia.Cantidad_Personas_Afectadas, [Validators.required]],
    //  Estado : [this.emergencia.Estado, [Validators.required]]

    });
    console.log('Ha creado el formulario')

  }

  resetearForm(): void {
    this.formularioEmergencia.reset({
      Ubicacion: '',
      Departamento: '',
      Municipio: '',
      Descripcion_Lugar: '',
      Descripcion_Emergencia: '',
      Cantidad_Personas_Afectadas: '',

    });
    this.materialFormDirective.resetForm();
  }


  onValueChanged(data?: any): void {
    //console.log('Data recibida', data)
    if (!this.formularioEmergencia) {
      return;
    }

    const form = this.formularioEmergencia;
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


  async registrarEmergencia() {
    const f = this.formularioEmergencia.value;
    console.log("Formulario a enviar: ", f);
    this.emergencia = this.formularioEmergencia.value;
    this.emergencia.Id_Emergencia = 1;
    this.emergencia.Id_Usuario = 1;
    this.emergencia.Id_Tipo_Emergencia = 1;
    this.emergencia.Ubicacion = this.emergencia.Ubicacion;
    this.emergencia.Departamento = this.emergencia.Departamento;
    this.emergencia.Municipio = this.emergencia.Municipio;
    this.emergencia.Descripcion_Emergencia = this.emergencia.Descripcion_Emergencia;
    this.emergencia.Descripcion_Lugar = this.emergencia.Descripcion_Lugar;
    this.emergencia.Cantidad_Personas_Afectadas = this.emergencia.Cantidad_Personas_Afectadas;

    console.log('Usuario a registrar: ', this.emergencia);
    this.emergenciaservice.save(this.emergencia);
    this.resetearForm();


  }
}
