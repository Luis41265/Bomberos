import { Injectable } from '@angular/core';
import {Geolocation, PermissionStatus, Position} from "@capacitor/geolocation";
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  position:Position;
  permissionStatus:PermissionStatus;
  constructor(private alertController:AlertController) {
    this.solicitarPermisos();
  }

  public async readActualPosition():Promise<Position>{
    await Geolocation.checkPermissions().then(Permisos=>{
      this.permissionStatus=Permisos;
      if(Permisos.location==='denied' || Permisos.coarseLocation==='denied'){
        Geolocation.requestPermissions().then(Permisos2=>{
          this.permissionStatus=Permisos2;
        })
      }
    })
    if(this.permissionStatus.location!=='denied' || this.permissionStatus.coarseLocation!=='denied'){
      this.position= await Geolocation.getCurrentPosition();
      console.log('Current Position Obtenida', this.position);
      return this.position;
    }else{
      this.AlertError("Es necesario otorgue Permisos de Acceso a su Ubicación.", 'Vuelva a intentarlo por favor');
      return null;
    }
  }

  public async solicitarPermisos():Promise<void>{
    await Geolocation.checkPermissions().then(Permisos=>{
      this.permissionStatus=Permisos;
      if(Permisos.location==='denied' || Permisos.coarseLocation==='denied'){
        Geolocation.requestPermissions().then(Permisos2=>{
          this.permissionStatus=Permisos2;
        })
      }
    });
  }


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

}
