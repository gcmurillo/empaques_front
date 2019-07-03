import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { transition, trigger, style, animate } from '@angular/animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {

  constructor(public loginService: LoginService, public router: Router) { }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme4');
    localStorage.removeItem('bodega');
    localStorage.removeItem('token');
    localStorage.removeItem('tipo');
  }

  loginForm = new FormGroup(
    {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    }
);

  login() {
    const data = {
      "username": this.loginForm.value.username,
      "password": this.loginForm.value.password
    };
    console.log(data);
    this.loginService.login(data.username, data.password).subscribe(
      response => {
        localStorage.setItem('bodega', response.bodega.nombre);
        localStorage.setItem('token', response.token);
        localStorage.setItem('tipo', response.tipo);
        if (response.tipo === 'OP') {
          this.router.navigate(['/empaques']);
        } else {
          this.router.navigate(['/transacciones/no-desp']);
        }
      },
      err => {
        swal(
          'Error al iniciar sesion',
          'Usuario o contraseña incorrecta',
          'error'
        );
      }
    );
  }

}
