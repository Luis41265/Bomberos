import { Injectable } from '@angular/core';
import {EquipoAtencion} from "../Entidades/EquipoAtencion";
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Usuario} from "../Entidades/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url:string="usuario";
  urldelete:string="/delete";
  //detallesequiposemergencias:Usuario[];


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
  /*obtenerEmergencias():void{
    this.apirest.get<Usuario[]>(this.url).subscribe(result=>{
        console.log("Detalles de Equipo Emergencias Obtenidos: ");
        console.log(result);
        this.detallesequiposemergencias=result;
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener los Detalles de Equipo Emergencias');
        console.log(error);
      });
  }*/

  guardar(Usuario:Usuario):void{
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

  update(Usuario:Usuario):void{
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

  delete(Usuario:Usuario):void{
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