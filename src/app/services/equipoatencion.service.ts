import {Injectable} from '@angular/core';
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {EquipoAtencion} from "../Entidades/EquipoAtencion";

@Injectable({
  providedIn: 'root'
})
export class EquipoatencionService {

  detallesequiposemergencias: EquipoAtencion[];
  private url: string = "equipoatencion";
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
    this.apirest.get<EquipoAtencion[]>(this.url).subscribe(result => {
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

  update(equipoAtencion: EquipoAtencion): void {
    this.apirest.post<EquipoAtencion>(this.url, equipoAtencion).subscribe(result => {
        console.log("Resultado de guardar el Equipo Atención Emergencia: ");
        console.log(result);
        this.detallesequiposemergencias.push(result);
        this.Alert('Equipo Atención Emergencia ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar Equipo Atención Emergencia');
        console.log(error);
        this.AlertError('Equipo Atención Emergencia No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  save(equipoAtencion: EquipoAtencion): void {
    this.apirest.put<EquipoAtencion>(this.url, equipoAtencion).subscribe(result => {
        console.log("Resultado de actualizar el Equipo Atención Emergencia: ");
        console.log(result);
        this.detallesequiposemergencias.forEach(temp => {
          if (temp.Id_Equipo === result.Id_Equipo) {
            temp = result;
          }
        });
        this.Alert('Equipo Atención Emergencia ha sido actualizado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar el Equipo Atención Emergencia');
        console.log(error);
        this.AlertError('Equipo Atención Emergencia No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(equipoAtencion: EquipoAtencion): void {
    let urlDelete = this.url + this.urldelete;
    this.apirest.delete<EquipoAtencion>(urlDelete, equipoAtencion).subscribe(result => {
        console.log("Resultado de eliminar El Equipo Atención Emergencia: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.detallesequiposemergencias = this.detallesequiposemergencias.filter(temp => {
          return temp.Id_Equipo !== result.Id_Equipo;
        })
        this.Alert('Equipo Atención Emergencia ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar el Equipo Atención Emergencia');
        console.log(error);
        this.AlertError('Equipo Atención Emergencia No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }


}
