import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
}from '@angular/forms';
  import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {UsuarioService} from "../services/usuario.service";
import {Usuario} from "../Entidades/Usuario";

@Component({
  selector: 'app-registrar-u',
  templateUrl: './registrar-u.page.html',
  styleUrls: ['./registrar-u.page.scss'],
})
export class RegistrarUPage implements OnInit {

  formularioRegistro : FormGroup;

  usuario : Usuario = {
    Id_Usuario:0,
    Id_Rol:0,
    Id_Subestacion: 0,
    Usuario:"",
    Contraseña: "",
    Nombre:"",
    CUI:"",
    Telefono: '',
    Correo: "",
    TokenActual:"",
    Estado:true,
  }

  formErrors = {
    'Id_Material': "",
    'Descripcion': "",
    'Cantidad_Existente': "",
    'Id_Tarjeta_NFC': ""

  };

  validationMessages = {
    'Id_Material': {
      'required': 'El Id Material es requerido',
      'valorZero': 'El Id Material No Puede ser 0',
    },

    'Descripcion': {
      'required': 'La descripción del material es requerida'
    },

    'Cantidad_Existente': {
      'required': 'La cantidad existente del material es requerida',
      'valorZero': 'La cantidad existente No Puede ser 0'
    },

    'Id_Tarjeta_NFC': {
      'required': 'El Id de la Tarjeta NFC es requerido',
      'valorZero': 'El Id de la Tarjeta NFC No Puede ser 0'
    }

  }

  constructor(public fb: FormBuilder, private router : Router,
    private alertController: AlertController,
    private usuarioservice:UsuarioService) {
    this.usuario=this.usuarioservice.getUsuario();
    console.log('Correo: ', this.usuario.Correo);
    console.log('Nombre: ', this.usuario.Nombre);
    this.formularioRegistro = this.fb.group({
      Nombre: ["", [Validators.required] ],
      Apelllido : ["", [Validators.required]],
      Correo : [this.usuario.Correo, [Validators.required]],
      Telefono : [this.usuario.Telefono, [Validators.required]],
      CUI : [this.usuario.CUI, [Validators.required]],
      Contraseña : ["",[Validators.required] ],
      ConfirmarContraseña : ["", [Validators.required]]
    });
    this.formularioRegistro.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.formularioRegistro
    console.log(this.formularioRegistro.value)
    /*this.formularioRegistro.patchValue(
      {
        Correo: this.usuario.Correo
      }
    )*/
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

 async  guardar (){
      var f = this.formularioRegistro.value;

      if (this.formularioRegistro.invalid){
        const alert = await this.alertController.create({
          header : 'Datos Incompletos',
          message : 'Campos Incompletos',
          buttons : ['Aceptar']

        });

        await alert.present();
        return;
      }

    }
}
