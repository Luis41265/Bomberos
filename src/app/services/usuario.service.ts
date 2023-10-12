import { Injectable } from '@angular/core';
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Usuario} from "../Entidades/Usuario";
import {Md5} from "ts-md5";
import { map,  } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url:string="usuario";
  private urlLogin:string="login";
  private urlLoginGoogle:string="login/google";
  private urlVerify:string=this.url+"/verify";
  private urldelete:string="/delete";
  private usuario : Usuario = {
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
  };


  constructor(private apirest:ApirestService, private alertController:AlertController,
              private router:Router) { }

  async Alert(header:string, subheader:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async AlertError(header:string, subheader:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
  }


  public getUsuario():Usuario{
    return this.usuario;
  }

  public setUsuario(usuario:Usuario){
    this.usuario=usuario;
  }

  public update(Usuario:Usuario):void{
    this.usuario.Contraseña=Md5.hashStr(this.usuario.Contraseña);
    this.apirest.post<Usuario>(this.url, Usuario).subscribe(result=>{
        console.log("Resultado de guardar Usuario: ");
        console.log(result);
        //this.detallesequiposemergencias.push(result);
        this.Alert('Usuario ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar Usuario');
        console.log(error);
        this.AlertError('Usuario No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  public async verify(Usuario:Usuario):Promise<boolean>{
    let result=false;
    return await this.apirest.post<Usuario>(this.urlVerify, Usuario).pipe(map(usuario=>{return usuario.Estado})).toPromise();
  }

  public login(Usuario:Usuario):void{
    this.usuario.Contraseña=Md5.hashStr(this.usuario.Contraseña);
    this.apirest.post<Usuario>(this.urlLogin, Usuario).subscribe(result=>{
        console.log("Resultado de Logear al Usuario: ");
        console.log(result);
        this.usuario=result;
        this.apirest.setToken(result.TokenActual);
        //this.detallesequiposemergencias.push(result);
        this.Alert('Bienvenido', 'En que Podemos Apoyarte???');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al Loguear Usuario');
        console.log(error);
        this.AlertError('Usuario No ha sido autenticado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  public loginGoogle(Usuario:Usuario):void{
    this.usuario.Contraseña=Md5.hashStr(this.usuario.Contraseña);
    this.apirest.post<Usuario>(this.urlLoginGoogle, Usuario).subscribe(result=>{
        console.log("Resultado de Logear al Usuario Por medio de Google: ");
        console.log(result);
        this.usuario=result;
        this.apirest.setToken(result.TokenActual);
        //this.detallesequiposemergencias.push(result);
        this.Alert('Bienvenido', 'En que Podemos Apoyarte???');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al Loguear Usuario');
        console.log(error);
        this.AlertError('Usuario No ha sido autenticado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  public save(Usuario:Usuario):void{
    this.usuario.Contraseña=Md5.hashStr(this.usuario.Contraseña);
    this.apirest.put<Usuario>(this.url, Usuario).subscribe(result=>{
        console.log("Resultado de actualizar Usuario: ");
        console.log(result);
        /*this.detallesequiposemergencias.forEach(temp=>{
          if(temp.Id_Equipo===result.Id_Equipo){
            temp=result;
          }
        });*/
        this.Alert('Usuario ha sido actualizado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar Usuario');
        console.log(error);
        this.AlertError('Usuario No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  public delete(Usuario:Usuario):void{
    this.usuario.Contraseña=Md5.hashStr(this.usuario.Contraseña);
    let urlDelete=this.url+this.urldelete;
    this.apirest.delete<Usuario>(urlDelete, Usuario).subscribe(result=>{
        console.log("Resultado de eliminar Usuario: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        /*this.detallesequiposemergencias=this.detallesequiposemergencias.filter(temp=>{
          return temp.Id_Equipo!==result.Id_Equipo;
        })*/
        this.Alert('Usuario ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar Usuario');
        console.log(error);
        this.AlertError('Usuario No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }


}
