import { Injectable } from '@angular/core';
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import { Notificacion} from "../Entidades/Notificacion";
@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  url:string="alerta";
  urldelete:string="/delete";
  notificacionesemergencias:Notificacion[];


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
  obtenerEmergencias(idUsuario:number):void{
    let urlTemp=this.url+"/"+idUsuario;
    this.apirest.get<Notificacion[]>(urlTemp).subscribe(result=>{
        console.log("Notificaciones de Emergencias Obtenidos: ");
        console.log(result);
        this.notificacionesemergencias=result;
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener las Notificaciones de Emergencias');
        console.log(error);
      });
  }

  guardar(Notificacion:Notificacion):void{
    this.apirest.post<Notificacion>(this.url, Notificacion).subscribe(result=>{
        console.log("Resultado de guardar la Notificacion de Emergencia: ");
        console.log(result);
        this.notificacionesemergencias.push(result);
        this.Alert('Notificacion de Emergencia ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar Notificacion de Emergencia');
        console.log(error);
        this.AlertError('Notificacion de Emergencia No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  update(Notificacion:Notificacion):void{
    this.apirest.put<Notificacion>(this.url, Notificacion).subscribe(result=>{
        console.log("Resultado de actualizar la Notificacion de Emergencia: ");
        console.log(result);
        this.notificacionesemergencias.forEach(temp=>{
          if(temp.Id_Notificacion===result.Id_Notificacion){
            temp=result;
          }
        });
        this.Alert('Notificacion de Emergencia ha sido actualizado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar la Notificacion de Emergencia');
        console.log(error);
        this.AlertError('Notificacion de Emergencia No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(Notificacion:Notificacion):void{
    let urlDelete=this.url+this.urldelete;
    this.apirest.delete<Notificacion>(urlDelete, Notificacion).subscribe(result=>{
        console.log("Resultado de eliminar la Notificacion de Emergencia: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.notificacionesemergencias=this.notificacionesemergencias.filter(temp=>{
          return temp.Id_Notificacion!==result.Id_Notificacion;
        })
        this.Alert('Notificacion de Emergencia ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar la Notificacion de Emergencia');
        console.log(error);
        this.AlertError('Notificacion de Emergencia No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }


}
