import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResult } from '../../shared/ubicacion/ubicacion';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {


    transaccion: Observable<any>;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient, private router: Router) { }

    public login(user: string, pass: string): Observable<LoginResult> {
        return this.http.post<LoginResult>(myGlobals.apiURL + myGlobals.LOGIN, {
            "username": user,
            "password": pass
        });
    }

    public isLoged(tipo) {
        if (localStorage.getItem('tipo') !== tipo) {
            this.router.navigate(['/auth/login/simple']);
        }
        if (!localStorage.getItem('token')) {
            this.router.navigate(['/auth/login/simple']);
        } else {
            console.log(localStorage.getItem('token'));
        }
    }

}
