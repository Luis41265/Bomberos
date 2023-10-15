import {Component} from '@angular/core';
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

  loginForm: FormGroup;
  username: string = '1';
  password: string = '1';

  constructor(public fb: FormBuilder,
              private router: Router,
              private alertController: AlertController,
              private apirest: ApirestService,
              private usuarioservice: UsuarioService
  ) {
    this.initGoogle();

    this.loginForm = this.fb.group({
      //loginForm = new FormGroup({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3),])
    })


  }

  iniciarSesion() {

    // if(this.username == 'usuario' && this.password == '1234'){
    //   this.router.navigate(['/menu']);


    // } else {
    //   alert('Credenciales Incorrectas');
    // }
    let url = 'login';
    let password = this.usuario.Contraseña;
    this.usuario.Contraseña = Md5.hashStr(this.usuario.Contraseña);


    console.log('Password sin encriptar: ' + password);
    console.log('Nombre Usuario: ' + this.usuario.Usuario);
    console.log('Contraseña Encriptada: ' + this.usuario.Contraseña);
    console.log('Consumira el RestAPI: ' + url);
    console.log(this.usuario);

    this.apirest.put(url, this.usuario).subscribe(usuario => {
        // Entra aquí con respuesta del servicio correcta código http 200
        console.log('Se autentico correctamente');
        console.log(usuario);
        this.apirest.setToken(usuario.TokenActual);
        this.usuario.Contraseña = '';
        this.usuario = usuario;
        // this.apirest.usuario=this.usuario;
        this.router.navigate(['/menu']);
      }, err => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Las credenciales no son correctas');
        console.log(err);
        this.presentAlertLogin();
        this.usuario.Contraseña = '';
      }
    );

    //this.router.navigate(['/menu']);

  }

  async presentAlertLogin() {
    const alert = await this.alertController.create({
      header: 'Credenciales no validas',
      //subHeader: 'Important message',
      message: 'Vuelva a ingresar sus credenciales por favor!',
      buttons: ['OK'],
    });
    await alert.present();
  }


  async Alert(header: string, subheader: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
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

  Registrarse() {

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
    google.accounts.id.prompt();
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
