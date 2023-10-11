import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.page.html',
  styleUrls: ['./notificacion.page.scss'],
})
export class NotificacionPage implements OnInit {

  notifications: any[] = [];

  constructor() {

    this.notifications = [
      { userId: '123', emergencyId: '456', dateTime: new Date(), status: 'pendiente' },
      { userId: '789', emergencyId: '101', dateTime: new Date(), status: 'pendiente' },
    ];
  }


  changeStatus(notification) {
    // Cambia el estado de la notificación (por ejemplo, a "leída")
    notification.status = 'leída';
    // Guarda el nuevo estado en el almacenamiento local o en tu API
  }
  ngOnInit() {
  }

}
