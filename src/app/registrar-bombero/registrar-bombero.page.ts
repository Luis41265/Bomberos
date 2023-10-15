import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Usuario} from "../Entidades/Usuario";
import {UsuarioService} from "../services/usuario.service";

@Component({
  selector: 'app-registrar-bombero',
  templateUrl: './registrar-bombero.page.html',
  styleUrls: ['./registrar-bombero.page.scss'],
})
export class RegistrarBomberoPage implements OnInit {

  formularioBombero: FormGroup;

  @ViewChild('fform') materialFormDirective: any;

  usuario: Usuario = {
    Id_Usuario: 0,
    Id_Rol: 1,
    Id_Subestacion: 1,
    Usuario: "",
    Contraseña: "",
    Nombre: "",
    CUI: "",
    Telefono: '',
    Correo: "",
    TokenActual: "",
    Estado: true,
  }

  formErrors = {
    'given_name': "",
    'family_name': "",
    'Correo': "",
    'Telefono': "",
    'CUI': "",
    'Contrasenia': "",
    'ConfirmarContrasenia': ""
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
              private alertController: AlertController, private usuarioservice: UsuarioService) {
    this.usuario = this.usuarioservice.getUsuario();
    this.createForm();
  }

  ngOnInit() {
    console.log("Formulario, ", this.formularioBombero)
    this.formularioBombero.valueChanges.pipe().subscribe(
      data => {
        //console.log("Data que validara el formulario: ", data);
        this.onValueChanged(data);
      }
    );
    console.log("Formulario, ", this.formularioBombero)
    console.log('Ha Suscrito el formulario')
  }

  createForm(): void {
    this.formularioBombero = this.fb.group({
      given_name: [this.usuario.given_name, [Validators.required]],
      family_name: [this.usuario.family_name, [Validators.required]],
      Correo: [this.usuario.Correo, [Validators.required, Validators.email]],
      Telefono: [this.usuario.Telefono, [Validators.required]],
      CUI: [this.usuario.CUI, [Validators.required]],
      Contrasenia: ['', [Validators.required]],
      ConfirmarContrasenia: ['', [Validators.required]]
    });
    console.log('Ha creado el formulario')

  }

  resetearForm(): void {
    this.formularioBombero.reset({
      given_name: '',
      family_name: '',
      Correo: '',
      Telefono: '',
      CUI: '',
      Contrasenia: '',
      ConfirmarContrasenia: '',
    });
    this.materialFormDirective.resetForm();
  }


  onValueChanged(data?: any): void {
    //console.log('Data recibida', data)
    if (!this.formularioBombero) {
      return;
    }

    const form = this.formularioBombero;
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
    const f = this.formularioBombero.value;
    console.log("Formulario a enviar: ", f);
    this.usuario = this.formularioBombero.value;
    this.usuario.Id_Rol = 1;
    this.usuario.Id_Subestacion = 1;
    this.usuario.Nombre = this.usuario.given_name + ' ' + this.usuario.family_name;
    this.usuario.Usuario = this.usuario.Nombre;
    this.usuario.Contraseña = this.usuario.Contrasenia;
    console.log('Usuario a registrar: ', this.usuario);
    this.usuarioservice.save(this.usuario);
    this.resetearForm();


  }
}
