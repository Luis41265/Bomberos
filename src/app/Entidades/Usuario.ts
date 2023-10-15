export class Usuario {
  Id_Usuario?: number;
  Id_Rol: number = 1;
  Id_Subestacion: number = 1;
  Usuario: string = "";
  Contraseña: string = "";
  Contrasenia?: string = "";
  Nombre: string = "";
  family_name?: string = "";
  given_name?: string = "";
  CUI: string = "";
  Telefono?: string = "";
  Correo: string = "";
  TokenActual: string = "";
  Estado: boolean = true;
  created_at?: string;
  updated_at?: string;
}
