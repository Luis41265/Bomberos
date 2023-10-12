import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registrar-bombero',
  templateUrl: './registrar-bombero.page.html',
  styleUrls: ['./registrar-bombero.page.scss'],
})
export class RegistrarBomberoPage implements OnInit {

  bombero = {
    nombre: '',
    apellido: '',
    puesto: '',
    dpi: '',
    correo: '',
    password: '',
  };
  confirmacionpassword = '';

  constructor(private router: Router) {
  }

  registrarBombero() {

    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
