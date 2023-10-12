import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Usuario} from "../Entidades/Usuario";

@Component({
  selector: 'app-registrar-u',
  templateUrl: './registrar-u.page.html',
  styleUrls: ['./registrar-u.page.scss'],
})
export class RegistrarUPage implements OnInit {

  formularioRegistro: FormGroup;

  usuario: Usuario = {
    Id_Usuario: 0,
    Id_Rol: 0,
    Id_Subestacion: 0,
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
    'nombre': "",
    'apellido': "",
    'correo': "",
    'telefono': "",
    'cui': "",
    'contraseña': "",
    'confirmarcontraseña': ""
  };

  validationMessages = {
    'nombre': {
      'required': 'El Nombre del Usuario es requerido',
    },
    'apellido': {
      'required': 'El Apellido del Usuario es requerido',
    },
    'correo': {
      'required': 'El Correo del Usuario es requerido',
    },
    'cui': {
      'required': 'El Cui del  Usuario es requerido',
      ' valorZero': 'El numero de CUI no puede ser 0'
    },

    'contraseña': {
      'required': 'La contraseña del Usuario es requerido',
    },

    'confirmarcontraseña': {
      'required': 'La confirmacion de contraseña del Usuario es requerido',
    },

  }

  constructor(public fb: FormBuilder, private router: Router,
              public alertController: AlertController) {
    this.createForm();

  }

  public valorZero: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;
    //console.log('Valor obtenido en el validador: '+valor);
    if (valor === 0) {
      return {valorZero: {value: control.value}};
    }
    return null;
  };

  createForm(): void {
    this.formularioRegistro = this.fb.group({
      Nombre: ["", [Validators.required]],
      Apelllido: ["", [Validators.required]],
      Correo: [this.usuario.Correo, [Validators.required]],
      Telefono: [this.usuario.Telefono, [Validators.required]],
      CUI: [this.usuario.CUI, [Validators.required]],
      Contraseña: ["", [Validators.required]],
      ConfirmarContraseña: ["", [Validators.required]]
    });

    this.formularioRegistro.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //Resetear los mensajes de validacion
    console.log(this.formularioRegistro.value)

  }


  ngOnInit() {
  }


  onValueChanged(data?: any): void {
    if (!this.formularioRegistro) {
      return;
    }

    const form = this.formularioRegistro;
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

  async guardar() {
    var f = this.formularioRegistro.value;
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Campos Incompletos',
        buttons: ['Aceptar']

      });
      await alert.present();
      return;
    }

  }
}
