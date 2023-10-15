import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {TipoEmergencia} from "../Entidades/TipoEmergencia";
import {TipoemergenciaService} from "../services/tipoemergencia.service";
@Component({
  selector: 'app-tipos-emergencias',
  templateUrl: './tipos-emergencias.page.html',
  styleUrls: ['./tipos-emergencias.page.scss'],
})
export class TiposEmergenciasPage implements OnInit {

  formularioTipoEmergencia : FormGroup;

  @ViewChild('fform') materialFormDirective: any;

  tipoemergencia  : TipoEmergencia = {
    Id_Tipo_Emergencia : 0,
    Prioridad:  1,
    Nombre: '',
    Color: '',
    Estado: true,
  };

  formErrors = {
    'Prioridad': "",
    'Nombre': "",
    'Color': "",
    'Estado': "",
  };

  validationMessages = {
    'Prioridad': {
      'required': 'La prioridad  es requerida',
    },
    'Nombre': {
      'required': 'El nombre  es requerido',
    },
    'Color': {
      'required': 'El color es requerido',

    },
    'Estado': {
      'required': 'El estado es requerido'
    },


  }

  constructor(private fb: FormBuilder, private router: Router,
              private alertController: AlertController, private tipoemergenciaservice: TipoemergenciaService) {
    //this.tipoemergencia = this.tipoemergenciaservice.getUsuario();
    this.createForm();
  }

  ngOnInit() {
    console.log("Formulario, ", this.formularioTipoEmergencia)
    this.formularioTipoEmergencia.valueChanges.pipe().subscribe(
      data => {
        //console.log("Data que validara el formulario: ", data);
        this.onValueChanged(data);
      }
    );
    console.log("Formulario, ", this.formularioTipoEmergencia)
    console.log('Ha Suscrito el formulario')
  }

  createForm(): void {
    this.formularioTipoEmergencia = this.fb.group({
      given_name: [this.tipoemergencia.Prioridad, [Validators.required]],
      family_name: [this.tipoemergencia.Nombre, [Validators.required]],
      Correo: [this.tipoemergencia.Color, [Validators.required, Validators.email]],
      Telefono: [this.tipoemergencia.Estado, [Validators.required]]
    });
    console.log('Ha creado el formulario')

  }

  resetearForm(): void {
    this.formularioTipoEmergencia.reset({
      Prioridad: '',
      Nombre: '',
      Color: '',
      Estado: '',

    });
    this.materialFormDirective.resetForm();
  }


  onValueChanged(data?: any): void {
    //console.log('Data recibida', data)
    if (!this.formularioTipoEmergencia) {
      return;
    }

    const form = this.formularioTipoEmergencia;
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


  async registrarTipoEmergencia() {
    const f = this.formularioTipoEmergencia.value;
    console.log("Formulario a enviar: ", f);
    this.tipoemergencia = this.formularioTipoEmergencia.value;
    this.tipoemergencia.Id_Tipo_Emergencia = 1;
    this.tipoemergencia.Nombre = this.tipoemergencia.Nombre ;
    this.tipoemergencia.Color = this.tipoemergencia.Color;
    this.tipoemergencia.Estado = this.tipoemergencia.Estado;
    console.log('Usuario a registrar: ', this.tipoemergencia);
    this.tipoemergenciaservice.save(this.tipoemergencia);
    this.resetearForm();


  }
}


//   constructor() {
//   }

//   ngOnInit() {
//   }

//   registrartipoEmergencia() {

//   }
// }
