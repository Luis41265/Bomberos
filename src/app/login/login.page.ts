import {Component, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators,} from '@angular/forms';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {CredentialResponse} from 'google-one-tap';
import {Usuario} from "../Entidades/Usuario";
import {ApirestService} from "../services/apirest.service";
import {Md5} from "ts-md5";
import {UsuarioService} from "../services/usuario.service";

//import { OAuthModule } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

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

  loginForm: FormGroup;

  @ViewChild('fform') materialFormDirective: any;

  formErrors = {
    'Correo': "",
    'Contrasenia': ""
  };

  validationMessages = {
    'Correo': {
      'required': 'El Correo del Usuario es requerido',
      'email': 'Ingrese un correo valido por favor'
    },
    'Contrasenia': {
      'required': 'La contraseña del Usuario es requerido',
      'minlength': 'La contraseña No puede ser menor a 7 caracteres'
    }

  }


  constructor(public fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private apirest: ApirestService,
              private usuarioservice: UsuarioService
  ) {
    this.initGoogle();
    this.loginForm = this.fb.group({
      //loginForm = new FormGroup({
      'Correo': new FormControl("", [Validators.required, Validators.email]),
      'Contrasenia': new FormControl(null, [Validators.required, Validators.minLength(7),])
    });

    console.log("Formulario, ", this.loginForm)
    this.loginForm.valueChanges.pipe().subscribe(
      data => {
        //console.log("Data que validara el formulario: ", data);
        this.onValueChanged(data);
      }
    );

    console.log("Formulario, ", this.loginForm)
    console.log('Ha Suscrito el formulario')



  }


  onValueChanged(data?: any): void {
    //console.log('Data recibida', data)
    if (!this.loginForm) {
      return;
    }

    const form = this.loginForm;
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

  resetearForm(): void {
    this.loginForm.reset({
      Usuario: '',
      Contrasenia: ''
    });
    this.materialFormDirective.resetForm();
  }

  iniciarSesion() {
    this.usuario = this.loginForm.value;
    this.usuario.Contraseña = Md5.hashStr(this.usuario.Contrasenia);
    console.log('Usuario a iniciar sesión: ', JSON.stringify(this.usuario))
    this.usuarioservice.login(this.usuario);
    this.resetearForm();

  }


  async AlertError(header: string, subheader: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
  }


    iniciarSesionOAuth() {
      const proveedorOAuth = 'https://google-oauth.com/authorize';
      const clientID = '845227166117-46chud1o51ouloqlumtp72fudk0lq7j2.apps.googleusercontent.com';
      const redirectURI = 'https://accounts.google.com';
      const authUrl = `${proveedorOAuth}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`;

    }



  async mostrarTelefono() {
    const alert = await this.alertController.create({
      header: 'Número de Teléfono de Bomberos',
      message: 'Llama al número: 54397452',
      buttons: ['Cerrar'],
    });
  }


  initGoogle() {
    const thisClass = this;
    // @ts-ignore
    console.log('Google\'s One-tap sign in script loaded!');
    // @ts-ignore
    google.accounts.id.initialize({
      // Ref: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
      client_id: '845227166117-d6nopp7mpmeots7qne3tji8lbaecuo2a.apps.googleusercontent.com',
      callback: (response: CredentialResponse) => {
        thisClass.handleCredentialResponse(response)
      },
      //callback: this.handleCredentialResponse, // Whatever function you want to trigger...
      cancel_on_tap_outside: false,
      context: 'use'
    });
    console.log('Termino de cargar el cliente de google');
  }

  loginGoogle() {
    // @ts-ignore
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        document.cookie =  `g_state=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        // @ts-ignore
        google.accounts.id.prompt()
      }
    });
  }

  async handleCredentialResponse(response: CredentialResponse) {
    console.log('Respuesta de Google: ', response);
// Decoding  JWT token...
    let decodedToken: any | null = null;
    try {
      decodedToken = JSON.parse(atob(response?.credential.split('.')[1]));
    } catch (e) {
      console.error('Error while trying to decode token', e);
    }
    console.log('decodedToken', decodedToken);
    const email: string = decodedToken.email;
    const name: string = decodedToken.name;
    const family_name: string = decodedToken.family_name;
    const given_name: string = decodedToken.given_name;
    console.log('Correo: ', email);
    console.log('Nombre: ', name);

    this.usuario.Correo = email;
    this.usuario.Nombre = name;
    this.usuario.given_name = given_name;
    this.usuario.family_name = family_name;
    console.log('Correo: ', this.usuario.Correo);
    console.log('Nombre: ', this.usuario.Nombre);
    // this.usuarioservice.getUsuario().Correo=email;
    // this.usuarioservice.getUsuario().Nombre=name;
    let usuarioExist = false;
    //usuarioExist=await this.usuarioservice.verify(this.usuario);
    console.log('Resultado de verificar la existencia del usuario: ', usuarioExist);
    if (usuarioExist) {
      this.usuarioservice.loginGoogle(this.usuario);
    } else {
      this.usuarioservice.setUsuario(this.usuario);
      this.router.navigate(['/registrar-u']);
    }

  }

  async verifyGoogle(email: string, name: string) {
    console.log('Correo: ', this.usuario.Correo);
    console.log('Nombre: ', this.usuario.Nombre);

    this.usuario.Correo = email;
    this.usuario.Nombre = name;
    // this.usuarioservice.getUsuario().Correo=email;
    // this.usuarioservice.getUsuario().Nombre=name;
    //let usuarioExist = false;
    let usuarioExist = await this.usuarioservice.verify(this.usuario);
    console.log('Resultado de verificar la existencia del usuario: ', usuarioExist);
    if (usuarioExist) {
      this.usuarioservice.loginGoogle(this.usuario);
    } else {
      this.usuarioservice.setUsuario(this.usuario);
      this.router.navigate(['/registrar-u']);
    }
  }


}
