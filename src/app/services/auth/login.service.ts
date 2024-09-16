import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './loginRequest';
import  {  Observable, throwError, catchError, BehaviorSubject , tap} from 'rxjs';
import { User } from './user';
import { ApiResponse } from './userRsponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<User> =new BehaviorSubject<User>({
    id: 0,
    idInformacion: 0,
    tipoDocumento: '',
    numeroDocumento: 0,
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    telefono: 0,
    direccion: '',
    ciudad: ''
  });

  constructor(private http: HttpClient) { }

  login(credentials: LoginRequest): Observable<ApiResponse>{

    const url = 'http://localhost:8080/informacion-app/buscarCliente';

    return this.http.post<ApiResponse>(url, credentials).pipe(
      tap( (userData: ApiResponse) => {
      console.log("davids:", userData.data)

        this.currentUserData.next(userData.data);
        this.currentUserLoginOn.next(true);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    console.log("🚀 ~ LoginService ~ handleError ~ HttpErrorResponse:", error)
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

}
