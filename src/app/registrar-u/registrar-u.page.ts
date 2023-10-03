import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
}from '@angular/forms';
  import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registrar-u',
  templateUrl: './registrar-u.page.html',
  styleUrls: ['./registrar-u.page.scss'],
})
export class RegistrarUPage implements OnInit {

  formularioRegistro : FormGroup;

  constructor(public fb: FormBuilder, private router : Router,
    public alertController: AlertController) {
    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl ("", Validators.required ),
      'apellido' : new FormControl ("", Validators.required),
      'correo' : new FormControl (" ", Validators.required),
      'telefono' : new FormControl ("", Validators.required),
      'cui' : new FormControl ("", Validators.required),
      'contraseña' : new FormControl ("",Validators.required ),
      'confirmarcontraseña' : new FormControl ("", Validators.required)

    });



  }

  ngOnInit() {
  }

 async   guardar (){
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
