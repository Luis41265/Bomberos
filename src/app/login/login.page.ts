import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
}from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Usuario } from '../Entidades/Usuario';
import { Md5 } from 'ts-md5';
import { ApirestService } from '../services/apirest.service';
//import { OAuthModule } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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

    loginForm: FormGroup;
    username: string = '1';
    password : string = '1';


  constructor(  public fb : FormBuilder,
    private router : Router,
    private alertController: AlertController,
    private apirest: ApirestService,
    ) {

    this.loginForm = this.fb.group({
    //loginForm = new FormGroup({
      'nombre': new FormControl("", Validators.required),
      'password' : new FormControl(null, [Validators.required ,Validators.minLength(3),])
    })


   }

   iniciarSesion() {

        // if(this.username == 'usuario' && this.password == '1234'){
        //   this.router.navigate(['/menu']);


        // } else {
        //   alert('Credenciales Incorrectas');
        // }
        let url='login';
    let password=this.usuario.Contraseña;
    this.usuario.Contraseña=Md5.hashStr(this.usuario.Contraseña);


    console.log('Password sin encriptar: '+password);
    console.log('Nombre Usuario: '+this.usuario.Usuario);
    console.log('Contraseña Encriptada: '+this.usuario.Contraseña);
    console.log('Consumira el RestAPI: '+url);
    console.log(this.usuario);

    this.apirest.put(url, this.usuario).subscribe(usuario => {
            // Entra aquí con respuesta del servicio correcta código http 200
            console.log('Se autentico correctamente');
            console.log(usuario);
            this.apirest.setToken(usuario.TokenActual);
            this.usuario.Contraseña='';
            this.usuario=usuario;
           // this.apirest.usuario=this.usuario;
            this.router.navigate(['/menu']);
        }, err => {
            // Puedes pasarle el err en caso de que mandes el mensaje desde el
            console.log('Las credenciales no son correctas');
            console.log(err);
            this.presentAlertLogin();
            this.usuario.Contraseña='';
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





   iniciarSesionOAuth(){
     const proveedorOAuth = 'https://google-oauth.com/authorize';
     const clientID = '845227166117-46chud1o51ouloqlumtp72fudk0lq7j2.apps.googleusercontent.com';
     const redirectURI = 'https://accounts.google.com';
     const authUrl = `${proveedorOAuth}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`;




   }

   Registrarse() {



   }

   async  mostrarTelefono (){ const alert = await this.alertController.create({
    header: 'Número de Teléfono de Bomberos',
    message: 'Llama al número: 54397452',
    buttons: ['Cerrar'],
  });

  await alert.present();}
  ngOnInit() {

  }

}
