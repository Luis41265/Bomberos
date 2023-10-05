import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
}from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    loginForm: FormGroup;
    username: string = '1';
    password : string = '1';


  constructor(  public fb : FormBuilder,
    private router : Router) {

    this.loginForm = this.fb.group({
    //loginForm = new FormGroup({
      'nombre': new FormControl("", Validators.required),
      'password' : new FormControl(null, [Validators.required ,Validators.minLength(3),])
    })


   }

   iniciarSesion() {

        if(this.username == 'usuario' && this.password == 'contrasea '){
          this.router.navigate(['/menu']);


        } else {
          alert('Credenciales Incorrectas');
        }


   }

   iniciarSesionOAuth(){
    const proveedorOAuth = 'https://google-oauth.com/authorize';
    const clientID = '845227166117-46chud1o51ouloqlumtp72fudk0lq7j2.apps.googleusercontent.com';
    const redirectURI = 'https://accounts.google.com/';
    const authUrl = `${proveedorOAuth}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=token`;



   }

   Registrarse() {



   }

  ngOnInit() {

  }

}
