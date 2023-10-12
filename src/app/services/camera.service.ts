import {Injectable} from '@angular/core';
import {AlertController} from "@ionic/angular";
import {Camera, CameraResultType, GalleryPhotos, PermissionStatus, Photo} from "@capacitor/camera";

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  permissionStatus: PermissionStatus;

  constructor(private alertController: AlertController) {
    this.solicitarPermisos();
  }

  public async getPhoto(): Promise<Photo> {
    await Camera.checkPermissions().then(Permisos => {
      this.permissionStatus = Permisos;
      if (Permisos.camera === 'denied' || Permisos.photos === 'denied') {
        Camera.requestPermissions().then(Permisos2 => {
          this.permissionStatus = Permisos2;
        })
      }
    });
    if (this.permissionStatus.camera !== 'denied' || this.permissionStatus.photos !== 'denied') {
      const image = await Camera.getPhoto({
        allowEditing: true,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
      });
      console.log('Imagen Obtenida: ', image);
      return image;
    } else {
      this.AlertError("Es necesario otorgue Permisos de Acceso a su Galeria y Camara.", 'Vuelva a intentarlo por favor');
      return null;
    }
  }

  public async pickPhotos(): Promise<GalleryPhotos> {
    await Camera.checkPermissions().then(Permisos => {
      this.permissionStatus = Permisos;
      if (Permisos.camera === 'denied' || Permisos.photos === 'denied') {
        Camera.requestPermissions().then(Permisos2 => {
          this.permissionStatus = Permisos2;
        })
      }
    });
    if (this.permissionStatus.camera !== 'denied' || this.permissionStatus.photos !== 'denied') {
      const fotos = await Camera.pickImages({});
      console.log('Imagenes Obtenidas: ', fotos);
      return fotos;
    } else {
      this.AlertError("Es necesario otorgue Permisos de Acceso a su Galeria y Camara.", 'Vuelva a intentarlo por favor');
      return null;
    }
  }

  public async solicitarPermisos(): Promise<void> {
    await Camera.checkPermissions().then(Permisos => {
      this.permissionStatus = Permisos;
      if (Permisos.camera === 'denied' || Permisos.photos === 'denied') {
        Camera.requestPermissions().then(Permisos2 => {
          this.permissionStatus = Permisos2;
        })
      }
    });
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

}
