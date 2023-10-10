import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MenuController, Platform} from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private menu: MenuController
    ) {}

  abrirPagina(pagina: string) {
    this.router.navigate([pagina]);
  }


  closeMenu() :void {
    this.menu.enable(false);
    this.menu.enable(true);
  }

}
