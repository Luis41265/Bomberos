import {Injectable} from '@angular/core';
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {DetalleAtencion} from "../Entidades/DetalleAtencion";

@Injectable({
  providedIn: 'root'
})
export class DetalleatencionService {

  detallesatencionemergencias: DetalleAtencion[];
  private url: string = "detalleatencion";
  private urldelete: string = "/delete";

  constructor(private apirest: ApirestService, private alertController: AlertController,
              private router: Router) {
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

  obtenerEmergencias(): void {
    this.apirest.get<DetalleAtencion[]>(this.url).subscribe(result => {
        console.log("Detalles de Atención Emergencias Obtenidos: ");
        console.log(result);
        this.detallesatencionemergencias = result;
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener los Detalles de Atención Emergencias');
        console.log(error);
      });
  }

  update(detalle: DetalleAtencion): void {
    this.apirest.post<DetalleAtencion>(this.url, detalle).subscribe(result => {
        console.log("Resultado de guardar el detalle atención de emergencias: ");
        console.log(result);
        this.detallesatencionemergencias.push(result);
        this.Alert('Detalle atención de emergencias ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar el Detalle de atención emergencias');
        console.log(error);
        this.AlertError('Detalle de atención emergencias No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  save(detalle: DetalleAtencion): void {
    this.apirest.put<DetalleAtencion>(this.url, detalle).subscribe(result => {
        console.log("Resultado de actualizar el detalle atención de emergencias: ");
        console.log(result);
        this.detallesatencionemergencias.forEach(temp => {
          if (temp.Id_Detalle_Emergencia === result.Id_Detalle_Emergencia) {
            temp = result;
          }
        });
        this.Alert('Detalle de atención emergencias ha sido actualizado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar el detalle atención de emergencias');
        console.log(error);
        this.AlertError('Detalle de atención emergencias No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(detalle: DetalleAtencion): void {
    let urlDelete = this.url + this.urldelete;
    this.apirest.delete<DetalleAtencion>(urlDelete, detalle).subscribe(result => {
        console.log("Resultado de eliminar El Detalle Atención Emergencia: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.detallesatencionemergencias = this.detallesatencionemergencias.filter(temp => {
          return temp.Id_Detalle_Emergencia !== result.Id_Detalle_Emergencia;
        })
        this.Alert('Detalle Atención Emergencia ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar el Detalle Atención Emergencia');
        console.log(error);
        this.AlertError('Detalle Atención Emergencia No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

}
