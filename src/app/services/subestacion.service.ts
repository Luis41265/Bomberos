import { Injectable } from '@angular/core';
import {EquipoAtencion} from "../Entidades/EquipoAtencion";
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Subestacion} from "../Entidades/Subestacion";

@Injectable({
  providedIn: 'root'
})
export class SubestacionService {

  private url:string="subestacion";
  private urldelete:string="/delete";
  subestaciones:Subestacion[];


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
  obtenerEmergencias():void{
    this.apirest.get<Subestacion[]>(this.url).subscribe(result=>{
        console.log("Subestaciones Obtenidas: ");
        console.log(result);
        this.subestaciones=result;
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener las Subestaciones');
        console.log(error);
      });
  }

  update(Subestacion:Subestacion):void{
    this.apirest.post<Subestacion>(this.url, Subestacion).subscribe(result=>{
        console.log("Resultado de guardar la Subestacion: ");
        console.log(result);
        this.subestaciones.push(result);
        this.Alert('Subestacion ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar Subestacion');
        console.log(error);
        this.AlertError('Subestacion No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  save(Subestacion:Subestacion):void{
    this.apirest.put<Subestacion>(this.url, Subestacion).subscribe(result=>{
        console.log("Resultado de actualizar la Subestacion: ");
        console.log(result);
        this.subestaciones.forEach(temp=>{
          if(temp.Id_Subestacion===result.Id_Subestacion){
            temp=result;
          }
        });
        this.Alert('Subestacion ha sido actualizado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar la Subestacion');
        console.log(error);
        this.AlertError('Subestacion No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(Subestacion:Subestacion):void{
    let urlDelete=this.url+this.urldelete;
    this.apirest.delete<Subestacion>(urlDelete, Subestacion).subscribe(result=>{
        console.log("Resultado de eliminar la Subestacion: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.subestaciones=this.subestaciones.filter(temp=>{
          return temp.Id_Subestacion!==result.Id_Subestacion;
        })
        this.Alert('Subestacion ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar la Subestacion');
        console.log(error);
        this.AlertError('Subestacion No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }


}
