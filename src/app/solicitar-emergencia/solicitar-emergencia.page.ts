import {Component, OnInit, ViewChild} from '@angular/core';
import {EmergenciaService} from '../services/emergencia.service';
import {AlertController} from '@ionic/angular';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Emergencia} from '../Entidades/Emergencia';
import {UsuarioService} from "../services/usuario.service";
import {GpsService} from "../services/gps.service";
import {TipoemergenciaService} from "../services/tipoemergencia.service";
import {TipoEmergencia} from "../Entidades/TipoEmergencia";
import {CameraService} from "../services/camera.service";
import {GalleryPhoto, Photo} from "@capacitor/camera";


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

  TiposEmergencias: TipoEmergencia[];

  fotos: Photo[] = [];
  fotosurl: string[] = [];
  fotosBase64: string[] = [];
  ubicacion: string;

  formErrors = {
    // 'Id_Emergencia': " ",
    // 'Id_Usuario': " ",
    // 'Id_Tipo_Emergencia ': " ",
    'Ubicacion': "",
    'Departamento': "",
    'Municipio': "",
    'Descripcion_Lugar': "",
    'Cantidad_Personas_Afectadas': "",
    'Descripcion_Emergencia': ""
    //'Estado': true,
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
              private alertController: AlertController, private emergenciaservice: EmergenciaService,
              private usuarioservice: UsuarioService, private gpsservice: GpsService, private tipoemergenciasservice: TipoemergenciaService,
              private camaraservice: CameraService) {
    this.emergencia.Id_Usuario = this.usuarioservice.getUsuario().Id_Usuario;
    this.TiposEmergencias = this.tipoemergenciasservice.tiposemergencias;
    this.createForm();
    this.gpsservice.readActualPosition().then(posicion => {
      this.emergencia.Ubicacion = JSON.stringify(posicion);
      this.ubicacion = JSON.stringify(posicion);
      console.log('Posición obtenida del Usuario: ', posicion)
    });

  }

  async tomarFoto() {
    const data = await this.camaraservice.getPhoto();

    this.fotos.push(data)
    this.fotosurl.push(data.webPath);
    console.log('Se a añadido una nueva foto a la galeria: ' + data.webPath);
    // leer foto
    let blob = await fetch(data.webPath).then(r => r.blob());
    console.log('Blob de la imagen: ', blob)
    // Convertir imagen a  base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result.toString();
      console.log('Imagen en base64:', base64data);
      this.fotosBase64.push(base64data);
    }
    reader.readAsDataURL(blob);
  }

  async seleccionarFotos() {

    let fotosarray = await this.camaraservice.pickPhotos();
    const fotos: GalleryPhoto[] = fotosarray.photos;

    for (let i = 0; i < fotos.length; i++) {
      let foto = fotos[i];
      this.fotosurl.push(foto.webPath);
      console.log('Se a añadido una nueva foto a la galeria: ' + foto.webPath);
      // leer foto
      let blob = await fetch(foto.webPath).then(r => r.blob());
      console.log('Blob de la imagen: ', blob)
      // Convertir imagen a  base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.toString();
        console.log('Imagen en base64:', base64data);
        this.fotosBase64.push(base64data);
      }
      reader.readAsDataURL(blob);
    }


  }


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
      Departamento: [this.emergencia.Departamento, [Validators.required]],
      Municipio: [this.emergencia.Municipio, [Validators.required]],
      Descripcion_Lugar: [this.emergencia.Descripcion_Lugar, [Validators.required]],
      Descripcion_Emergencia: [this.emergencia.Descripcion_Emergencia, [Validators.required]],
      Cantidad_Personas_Afectadas: [this.emergencia.Cantidad_Personas_Afectadas, [Validators.required]],
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
    this.emergencia.Ubicacion = this.ubicacion;
    this.emergencia.Id_Usuario = this.usuarioservice.getUsuario().Id_Usuario;
    this.emergencia.Id_Tipo_Emergencia = 1;

    console.log('Emergencia a registrar: ', this.emergencia);
    this.emergenciaservice.save(this.emergencia, this.fotosBase64);
    this.resetearForm();


  }
}
