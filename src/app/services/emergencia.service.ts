import { Injectable } from '@angular/core';
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Emergencia} from "../Entidades/Emergencia";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class EmergenciaService {

  url:string="emergencia";
  urldelete:string="/delete";
  emergencias:Emergencia[];


  constructor(private apirest:ApirestService, private alertController:AlertController,
              private router:Router) { }

  async emergenciaAlert(header:string, subheader:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async emergenciaAlertError(header:string, subheader:string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subheader,
      //message: 'Asegurese de utilizar un Id Material que no exista en el Sistema!',
      buttons: ['OK'],
    });
    await alert.present();
  }
  obtenerEmergencias():void{
    this.apirest.get<Emergencia[]>(this.url).subscribe(result=>{
      console.log("Emergencias Obtenidas: ");
      console.log(result);
      this.emergencias=result;
    },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener las emergencias');
        console.log(error);
      });
  }

  guardar(emergencia:Emergencia):void{
    this.apirest.post<Emergencia>(this.url, emergencia).subscribe(result=>{
        console.log("Resultado de guardar la emergencia: ");
        console.log(result);
        this.emergencias.push(result);
        this.emergenciaAlert('Emergencia ha sido creada exitosamente', 'En breve nos comunicaremos con usted!!!');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar la emergencia');
        console.log(error);
        this.emergenciaAlertError('Emergencia No ha sido creada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  update(emergencia:Emergencia):void{
    this.apirest.put<Emergencia>(this.url, emergencia).subscribe(result=>{
        console.log("Resultado de actualizar la emergencia: ");
        console.log(result);
        this.emergencias.forEach(emergencia=>{
          if(emergencia.Id_Emergencia===result.Id_Emergencia){
            emergencia=result;
          }
        });
        this.emergenciaAlert('Emergencia ha sido actualizada exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar la emergencia');
        console.log(error);
        this.emergenciaAlertError('Emergencia No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(emergencia:Emergencia):void{
    let urlDelete=this.url+this.urldelete;
    this.apirest.delete<Emergencia>(urlDelete, emergencia).subscribe(result=>{
        console.log("Resultado de eliminar la emergencia: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.emergencias=this.emergencias.filter(emergencia=>{
          return emergencia.Id_Emergencia!==result.Id_Emergencia;
        })
        this.emergenciaAlert('Emergencia ha sido eliminada exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar la emergencia');
        console.log(error);
        this.emergenciaAlertError('Emergencia No ha sido eliminada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }




}
