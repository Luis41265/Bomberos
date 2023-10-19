import {Injectable} from '@angular/core';
import {ApirestService} from "./apirest.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Fotografia} from "../Entidades/Fotografia";

@Injectable({
  providedIn: 'root'
})
export class FotografiaService {

  fotografiasemergencias: Fotografia[];
  private url: string = "fotografia";
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

  obtenerFotografias(Id_Emergencia:number): void {
    this.apirest.get<Fotografia[]>(this.url+'/'+Id_Emergencia).subscribe(result => {
        console.log("Fotografias de Emergencias Obtenidas: ");
        console.log(result);
        this.fotografiasemergencias = result;
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al obtener los Detalles de Equipo Emergencias');
        console.log(error);
      });
  }

  update(Fotografia: Fotografia): void {
    this.apirest.post<Fotografia>(this.url, Fotografia).subscribe(result => {
        console.log("Resultado de guardar Fotografia Atención Emergencia: ");
        console.log(result);
        this.fotografiasemergencias.push(result);
        this.Alert('Fotografia Atención Emergencia ha sido creado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al guardar Fotografia Atención Emergencia');
        console.log(error);
        this.AlertError('Fotografia Atención Emergencia No ha sido creado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  save(Fotografia: Fotografia): void {
    this.apirest.put<Fotografia>(this.url, Fotografia).subscribe(result => {
        console.log("Resultado de actualizar Fotografia Atención Emergencia: ");
        console.log(result);
        this.fotografiasemergencias.forEach(temp => {
          if (temp.Id_Fotografia === result.Id_Fotografia) {
            temp = result;
          }
        });
        this.Alert('Fotografia Atención Emergencia ha sido actualizado exitosamente', '');
        //this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al actualizar Fotografia Atención Emergencia');
        console.log(error);
        this.AlertError('Fotografia Atención Emergencia No ha sido actualizada exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

  delete(Fotografia: Fotografia): void {
    let urlDelete = this.url + this.urldelete;
    this.apirest.delete<Fotografia>(urlDelete, Fotografia).subscribe(result => {
        console.log("Resultado de eliminar Fotografia Atención Emergencia: ");
        console.log(result);
        //Eliminamos la Entidad localmente
        this.fotografiasemergencias = this.fotografiasemergencias.filter(temp => {
          return temp.Id_Fotografia !== result.Id_Fotografia;
        })
        this.Alert('Fotografia Atención Emergencia ha sido eliminado exitosamente', '');
        this.router.navigate(['/menu']);
      },
      error => {
        // Puedes pasarle el err en caso de que mandes el mensaje desde el
        console.log('Sucedio un error al eliminar Fotografia Atención Emergencia');
        console.log(error);
        this.AlertError('Fotografia Atención Emergencia No ha sido eliminado exitosamente', 'Vuelva a Intentarlo Por favor!!!');
      });
  }

}
