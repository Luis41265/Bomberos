export interface Usuario{
  Id_Usuario?:number;
  Id_Rol:number;
  Id_Subestacion:number;
  Usuario:string;
  Contraseña:string;
  Nombre:string;
  CUI:string;
  Telefono?:string;
  Correo:string;
  Estado:boolean;
  created_at?:string;
  updated_at?:string;
}
