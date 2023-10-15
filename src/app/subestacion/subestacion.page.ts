import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Subestacion} from "../Entidades/Subestacion";
import {SubestacionService} from "../services/subestacion.service";

@Component({
  selector: 'app-subestacion',
  templateUrl: './subestacion.page.html',
  styleUrls: ['./subestacion.page.scss'],
})
export class SubestacionPage implements OnInit {

  formularioSubestacion :  FormGroup;

  @ViewChild('fform') materialFormDirective: any;

  subestacion: Subestacion = {
    Id_Subestacion: 0,

    Nombre: "",
    Direccion: "",
    Telefono: "",
    Correo_Insitucional: "",
    Departamento: '',
    Municipio: "",
    Alcance_Sur: "",
    Alcance_Norte: "",
    Alcance_Este : "",
    Alcance_Oeste : "",
    Estado : true,
  }

  formErrors = {
    'Nombre': "",
    'Direccion': "",
    'Telefono': "",
    'Correo_Insitucional': "",
    'Departamento': "",
    'Municipio': "",
    'Alcance_Sur': "",
    'Alcance_Norte': "",
    'Alcance_Este': "",
    'Alcance_Oeste': "",
    'Estado' : "",

  };

  validationMessages = {
    'Nombre': {
      'required': 'El Nombre de la Institucion es requerido',
    },
    'Direccion': {
      'required': 'La direccion  es requerido',
    },
    'Correo': {
      'required': 'El Correo del Usuario es requerido',
      'email': 'Ingrese un correo valido por favor'
    },
    'Telefono': {
      'required': 'El Telefono del Usuario es requerido'
    },
    'Departamento': {
      'required': 'El Departamento  es requerido'
    },
    'Municipio': {
      'required': 'El Municipio  es requerido'
    },
    'Estado': {
      'required': 'El Estado  es requerido'
    },
    'Alcance_Sur' :{
    'required' : ' El Alcance sur es requerido'
     },

     'Alcance_Norte' : {
      'required' : ' El Alcance norte es requerido'
       },
       'Alcance_Este' :{
        'required' : ' El Alcance este es requerido'
         },
         'Alcance_Oeste' :{
          'required' : ' El Alcance oeste es requerido'
           },

  }

  constructor(private fb: FormBuilder, private router: Router,
              private alertController: AlertController, private subestacionservice: SubestacionService) {
   // this.subestacion = this.subestacionservice.getUsuario();
    this.createForm();
  }

  ngOnInit() {
    console.log("Formulario, ", this.formularioSubestacion)
    this.formularioSubestacion.valueChanges.pipe().subscribe(
      data => {
        //console.log("Data que validara el formulario: ", data);
        this.onValueChanged(data);
      }
    );
    console.log("Formulario, ", this.formularioSubestacion)
    console.log('Ha Suscrito el formulario')
  }

  createForm(): void {
    this.formularioSubestacion = this.fb.group({
      Nombre: [this.subestacion.Nombre, [Validators.required]],
      Direccion: [this.subestacion.Direccion, [Validators.required]],
      Correo_Insitucional : [this.subestacion.Correo_Insitucional, [Validators.required, Validators.email]],
      Telefono: [this.subestacion.Telefono, [Validators.required]],
      Departamento : [this.subestacion.Departamento, [Validators.required]],
      Municipio:  [this.subestacion.Municipio, [Validators.required]],
      Alcance_Sur:  [this.subestacion.Alcance_Sur, [Validators.required]],
      Alcance_Norte:  [this.subestacion.Alcance_Norte, [Validators.required]],
      Alcance_Este:  [this.subestacion.Alcance_Este, [Validators.required]],
      Alcance_Oeste:  [this.subestacion.Alcance_Oeste, [Validators.required]],




    });
    console.log('Ha creado el formulario')

  }

  resetearForm(): void {
    this.formularioSubestacion.reset({
      Nombre: '',
      Direccion: '',
      Correo_Institucional: '',
      Departamento: '',
      Municipio: '',
      Alcance_Sur: '',
      Alcance_Norte: '',
      Alcance_Este: '',
      Alcance_Oeste: '',

    });
    this.materialFormDirective.resetForm();
  }


  onValueChanged(data?: any): void {
    //console.log('Data recibida', data)
    if (!this.formularioSubestacion) {
      return;
    }

    const form = this.formularioSubestacion;
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


  async registrarSubestacion() {
    const f = this.formularioSubestacion.value;
    console.log("Formulario a enviar: ", f);
    this.subestacion = this.formularioSubestacion.value;
    this.subestacion.Id_Subestacion = 1;
    this.subestacion.Nombre = this.subestacion.Nombre;
    this.subestacion.Direccion = this.subestacion.Direccion;
    this.subestacion.Telefono = this.subestacion.Telefono;
    this.subestacion.Correo_Insitucional = this.subestacion.Correo_Insitucional;
    this.subestacion.Departamento = this.subestacion.Departamento;
    this.subestacion.Municipio = this.subestacion.Municipio;
    this.subestacion.Alcance_Sur = this.subestacion.Alcance_Sur;
    this.subestacion.Alcance_Norte = this.subestacion.Alcance_Norte;
    this.subestacion.Alcance_Este = this.subestacion.Alcance_Este;
    this.subestacion.Alcance_Oeste = this.subestacion.Alcance_Oeste;
    console.log('Usuario a registrar: ', this.subestacion);
    this.subestacionservice.save(this.subestacion);
    this.resetearForm();


  }
}
//   subestacion = {
//     nombre: '',
//     direccion: '',
//     telefono: '',
//     correoInstitucional: '',
//     departamento: '',
//     municipio: '',
//     alcanceSur: '',
//     alcanceNorte: '',
//     alcanceEste: '',
//     alcanceOeste: '',
//     estado: 'activo', // Estado por defecto
//   };

//   constructor() {
//   }

//   ngOnInit() {
//   }

//   RegistrarSubestacion() {

//   }
// }
