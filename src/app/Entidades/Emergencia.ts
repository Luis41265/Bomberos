export class Emergencia{
  Id_Emergencia?:number;
  Id_Usuario:number=0;
  Id_Tipo_Emergencia:number=0;
  Ubicacion?:string;
  Departamento?:string;
  Municipio?:string;
  Descripcion_Lugar?:string;
  Cantidad_Personas_Afectadas:number=0;
  Descripcion_Emergencia?:string;
  Estado:boolean=true;
  created_at?:string;
  updated_at?:string;
}
