import {Injectable} from '@angular/core';
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {TipoEmergencia} from "../Entidades/TipoEmergencia";

@Injectable({
  providedIn: 'root'
})
export class TipoemergenciaService {

  tiposemergencias: TipoEmergencia[];
  private url: string = "tipoemergencia";
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
    this.apirest.get<TipoEmergencia[]>(this.url).subscribe(result => {
        console.log("Tipos de Emergencias Obtenidas: ");
        console.log(result);
        this.tiposemergencias = result;
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener los Tipos de Emergencias Obtenidas');
        console.log(error);
      });
  }

  update(TipoEmergencia: TipoEmergencia): void {
    this.apirest.post<TipoEmergencia>(this.url, TipoEmergencia).subscribe(result => {
        console.log("Resultado de guardar Tipo de Emergencia: ");
        console.log(result);
        this.tiposemergencias.push(result);
        this.Alert('Tipo de Emergencia ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar Tipo de Emergencia');
        console.log(error);
        this.AlertError('Tipo de Emergencia No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  save(TipoEmergencia: TipoEmergencia): void {
    this.apirest.put<TipoEmergencia>(this.url, TipoEmergencia).subscribe(result => {
        console.log("Resultado de actualizar Tipo de Emergencia: ");
        console.log(result);
        this.tiposemergencias.forEach(temp => {
          if (temp.Id_Tipo_Emergencia === result.Id_Tipo_Emergencia) {
            temp = result;
          }
        });
        this.Alert('Tipo de Emergencia ha sido actualizado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar Tipo de Emergencia');
        console.log(error);
        this.AlertError('Tipo de Emergencia No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(TipoEmergencia: TipoEmergencia): void {
    let urlDelete = this.url + this.urldelete;
    this.apirest.delete<TipoEmergencia>(urlDelete, TipoEmergencia).subscribe(result => {
        console.log("Resultado de eliminar Tipo de Emergencia: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.tiposemergencias = this.tiposemergencias.filter(temp => {
          return temp.Id_Tipo_Emergencia !== result.Id_Tipo_Emergencia;
        })
        this.Alert('Tipo de Emergencia ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar Tipo de Emergencia');
        console.log(error);
        this.AlertError('Tipo de Emergencia No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }


}
