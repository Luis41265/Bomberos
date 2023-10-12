export class Usuario {
  Id_Usuario?: number;
  Id_Rol: number = 0;
  Id_Subestacion: number = 0;
  Usuario: string = "";
  Contraseña: string = "";
  Nombre: string = "";
  CUI: string = "";
  Telefono?: string;
  Correo: string = "";
  TokenActual: string = "";
  Estado: boolean = true;
  created_at?: string;
  updated_at?: string;
}
