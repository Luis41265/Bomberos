import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {EquipoAtencion} from "../Entidades/EquipoAtencion";
import {EquipoatencionService} from "../services/equipoatencion.service";

@Component({
  selector: 'app-ingresar-equipo',
  templateUrl: './ingresar-equipo.page.html',
  styleUrls: ['./ingresar-equipo.page.scss'],
})
export class IngresarEquipoPage implements OnInit {

  formularioEquipo: FormGroup;

  @ViewChild('fform') materialFormDirective: any;

  EquipoAtencion: EquipoAtencion = {
    Id_Equipo: 0,
    Nombre: "",
    Tipo: "",
    Estado: true,
  }

  formErrors = {
    'Nombre': "",
    'Tipo': "",
    //'Estado': ""
  };

  validationMessages = {
    'Nombre': {
      'required': 'El Nombre del equipo es requerido',
    },
    'tipo': {
      'required': 'El tipo del equipo es requerido',
    },


  }

  constructor(private fb: FormBuilder, private router: Router,
              private alertController: AlertController,
              private equipoatencionservice: EquipoatencionService) {
    this.equipoatencionservice.obtenerEquipoAtencion();
    this.createForm();
  }

  ngOnInit() {
    console.log("Formulario, ", this.formularioEquipo)
    this.formularioEquipo.valueChanges.pipe().subscribe(
      data => {
        //console.log("Data que validara el formulario: ", data);
        this.onValueChanged(data);
      }
    );
    console.log("Formulario, ", this.formularioEquipo)
    console.log('Ha Suscrito el formulario')
  }

  createForm(): void {
    this.formularioEquipo = this.fb.group({
      given_name: [this.EquipoAtencion.Nombre, [Validators.required]],
      family_name: [this.EquipoAtencion.Tipo, [Validators.required]],
      Correo: [this.EquipoAtencion.Estado, [Validators.required, Validators.email]],

    });
    console.log('Ha creado el formulario')

  }

  resetearForm(): void {
    this.formularioEquipo.reset({
      Nombre: '',
      Tipo: '',
      // Estado: '',

    });
    this.materialFormDirective.resetForm();
  }


  onValueChanged(data?: any): void {
    //console.log('Data recibida', data)
    if (!this.formularioEquipo) {
      return;
    }

    const form = this.formularioEquipo;
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


  async registrarEquipo() {
    const f = this.formularioEquipo.value;
    console.log("Formulario a enviar: ", f);
    this.EquipoAtencion = this.formularioEquipo.value;
    this.EquipoAtencion.Id_Equipo = 1;
    this.EquipoAtencion.Nombre = this.EquipoAtencion.Nombre;
    this.EquipoAtencion.Tipo = this.EquipoAtencion.Tipo;
    this.EquipoAtencion.Estado = this.EquipoAtencion.Estado;

    console.log('Usuario a registrar: ', this.EquipoAtencion);
    this.equipoatencionservice.save(this.EquipoAtencion);
    this.resetearForm();


  }
}
