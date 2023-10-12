import {Injectable} from '@angular/core';
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {DetalleEquipo} from "../Entidades/DetalleEquipo";

@Injectable({
  providedIn: 'root'
})
export class DetalleequipoService {

  detallesequiposemergencias: DetalleEquipo[];
  private url: string = "detalleequipo";
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
    this.apirest.get<DetalleEquipo[]>(this.url).subscribe(result => {
        console.log("Detalles de Equipo Emergencias Obtenidos: ");
        console.log(result);
        this.detallesequiposemergencias = result;
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener los Detalles de Equipo Emergencias');
        console.log(error);
      });
  }

  update(detalle: DetalleEquipo): void {
    this.apirest.post<DetalleEquipo>(this.url, detalle).subscribe(result => {
        console.log("Resultado de guardar el Detalle de Equipo: ");
        console.log(result);
        this.detallesequiposemergencias.push(result);
        this.Alert('Detalle de Equipo ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar el Detalle de Equipo');
        console.log(error);
        this.AlertError('Detalle de Equipo emergencias No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  save(detalle: DetalleEquipo): void {
    this.apirest.put<DetalleEquipo>(this.url, detalle).subscribe(result => {
        console.log("Resultado de actualizar el Detalle de Equipo: ");
        console.log(result);
        this.detallesequiposemergencias.forEach(temp => {
          if (temp.Id_Detalle_Equipo === result.Id_Detalle_Equipo) {
            temp = result;
          }
        });
        this.Alert('Detalle de Equipo emergencias ha sido actualizado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar el Detalle de Equipo');
        console.log(error);
        this.AlertError('Detalle de Equipo emergencias No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(detalle: DetalleEquipo): void {
    let urlDelete = this.url + this.urldelete;
    this.apirest.delete<DetalleEquipo>(urlDelete, detalle).subscribe(result => {
        console.log("Resultado de eliminar El Detalle de Equipo: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.detallesequiposemergencias = this.detallesequiposemergencias.filter(temp => {
          return temp.Id_Detalle_Equipo !== result.Id_Detalle_Equipo;
        })
        this.Alert('Detalle de Equipo ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar el Detalle de Equipo');
        console.log(error);
        this.AlertError('Detalle de Equipo No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }


}
