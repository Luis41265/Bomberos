import { Injectable } from '@angular/core';
import {Rol} from "../Entidades/Rol";
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url:string="rol";
  urldelete:string="/delete";
  roles:Rol[];


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
    this.apirest.get<Rol[]>(this.url).subscribe(result=>{
        console.log("Roles Obtenidos: ");
        console.log(result);
        this.roles=result;
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener los Detalles de Equipo Emergencias');
        console.log(error);
      });
  }

  guardar(Rol:Rol):void{
    this.apirest.post<Rol>(this.url, Rol).subscribe(result=>{
        console.log("Resultado de guardar el Rol: ");
        console.log(result);
        this.roles.push(result);
        this.Alert('Rol ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar Rol');
        console.log(error);
        this.AlertError('Rol No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  update(Rol:Rol):void{
    this.apirest.put<Rol>(this.url, Rol).subscribe(result=>{
        console.log("Resultado de actualizar el Rol: ");
        console.log(result);
        this.roles.forEach(temp=>{
          if(temp.Id_Rol===result.Id_Rol){
            temp=result;
          }
        });
        this.Alert('Rol ha sido actualizado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar el Rol');
        console.log(error);
        this.AlertError('Rol No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(Rol:Rol):void{
    let urlDelete=this.url+this.urldelete;
    this.apirest.delete<Rol>(urlDelete, Rol).subscribe(result=>{
        console.log("Resultado de eliminar el Rol: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.roles=this.roles.filter(temp=>{
          return temp.Id_Rol!==result.Id_Rol;
        })
        this.Alert('Rol ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar el Rol');
        console.log(error);
        this.AlertError('Rol No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }


}
