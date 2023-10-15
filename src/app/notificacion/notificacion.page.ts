import {Component, OnInit,ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Notificacion} from "../Entidades/Notificacion";
import {NotificacionService} from "../services/notificacion.service";
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

  formularioNotificacion: FormGroup

  @ViewChild('fform') materialFormDirective: any;

  notificacion : Notificacion = {
    Id_Notificacion: 0,
    Id_Usuario : 0,
    Id_Emergencia : 0,
    Fecha_Hora : '',
    IsOpen : true,
    Estado : true,



  }
  formErrors = {

    'Estado': "",

  };

  validationMessages = {
    'given_name': {
      'required': 'El Nombre del Usuario es requerido',
    },
    'family_name': {
      'required': 'El Apellido del Usuario es requerido',
    },
    'Correo': {
      'required': 'El Correo del Usuario es requerido',
      'email': 'Ingrese un correo valido por favor'
    },
    'Telefono': {
      'required': 'El Telefono del Usuario es requerido'
    },
    'CUI': {
      'required': 'El Cui del  Usuario es requerido'
    },

    'Contrasenia': {
      'required': 'La contraseña del Usuario es requerido',
    },

    'ConfirmarContrasenia': {
      'required': 'La confirmacion de contraseña del Usuario es requerido',
    },

  }

  constructor(private fb: FormBuilder, private router: Router,
              private alertController: AlertController, private notificacionservice: NotificacionService) {
   // this.notificacion = this.notificacionservice.getUsuario();
    this.createForm();
  }

  ngOnInit() {
    console.log("Formulario, ", this.formularioNotificacion)
    this.formularioNotificacion.valueChanges.pipe().subscribe(
      data => {
        //console.log("Data que validara el formulario: ", data);
        this.onValueChanged(data);
      }
    );
    console.log("Formulario, ", this.formularioNotificacion)
    console.log('Ha Suscrito el formulario')
  }

  createForm(): void {
    this.formularioNotificacion = this.fb.group({
      given_name: [this.notificacion.Estado, [Validators.required]],

    });
    console.log('Ha creado el formulario')

  }

  resetearForm(): void {
    this.formularioNotificacion.reset({
      estado: '',

    });
    this.materialFormDirective.resetForm();
  }


  onValueChanged(data?: any): void {
    //console.log('Data recibida', data)
    if (!this.formularioNotificacion) {
      return;
    }

    const form = this.formularioNotificacion;
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


  async registrarUsuario() {
    const f = this.formularioNotificacion.value;
    console.log("Formulario a enviar: ", f);
    this.notificacion = this.formularioNotificacion.value;
    this.notificacion.Id_Emergencia = 1;
    this.notificacion.Id_Notificacion = 1;
    this.notificacion.Id_Usuario = 1;
    this.notificacion.Fecha_Hora = this.notificacion.Fecha_Hora;
    this.notificacion.IsOpen = this.notificacion.IsOpen;
    this.notificacion.Estado = this.notificacion.Estado;
    console.log('notificacion: ', this.notificacion);
    this.notificacionservice.save(this.notificacion);
    this.resetearForm();


  }
}
