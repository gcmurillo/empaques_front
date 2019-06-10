import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Empaque, EmpaqueDetail } from '../../shared/empaque/empaque';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EmpaquesService {

    empaque: Observable<any>;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public getEmpaques(): Observable<Empaque[]> {
        return this.http.get<Empaque[]>(myGlobals.apiURL + myGlobals.EMPAQUES);
    }

    public addEmpaque(empaque: Empaque): Observable<Empaque> {
        return this.http.post<Empaque>(myGlobals.apiURL + myGlobals.CREAR_EMPAQUES, empaque);
    }

    public getEmpaquebyQuery(query: string): Observable<Empaque[]> {
        return this.http.get<Empaque[]>(myGlobals.apiURL + myGlobals.EMPAQUES + query);
    }

    public getEmpaquesDisponibles(): Observable<Empaque[]> {
        return this.http.get<Empaque[]>(myGlobals.apiURL + myGlobals.EMPAQUES_DISPONIBLES);
    }

}
