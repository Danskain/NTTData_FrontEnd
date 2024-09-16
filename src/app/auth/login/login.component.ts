import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError:string="";
  loginForm=this.formBuilder.group({
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
  })
  constructor(private formBuilder:FormBuilder, private router:Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  get tipoDocumento() {
    return this.loginForm.controls.tipoDocumento;
  }

  get numeroDocumento() {
    return this.loginForm.controls.numeroDocumento;
  }

  // Formatear el número con separación de miles
  formatNumber(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Elimina cualquier caracter que no sea numérico
    value = Number(value).toLocaleString('es'); // Formato de separación de miles
    input.value = value;
  }


  login(){
    if(this.loginForm.valid){
      this.loginError="";

      const numeroDocumentoSinPuntos = this.loginForm.value.numeroDocumento!.toString().replace(/\./g, '');

      const loginData: LoginRequest = {
        tipoDocumento: this.loginForm.value.tipoDocumento || '',
        numeroDocumento: Number(numeroDocumentoSinPuntos) // Convertir a número
      };

      this.loginService.login(loginData).subscribe({
        next: (userData) => {
          console.log('santa fe', userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

}
