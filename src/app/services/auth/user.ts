/* export interface User {
    id:number;
    name?:string;
    lastName?:string;
    email:string;
    message?:string;
} */

export interface User {
  id: number;
  idInformacion: number;
  tipoDocumento?: string;
  numeroDocumento: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: number;
  direccion: string;
  ciudad: string;
}
