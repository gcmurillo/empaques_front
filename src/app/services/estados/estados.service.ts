import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EstadoEmpaque } from '../../shared/estado_empaque/estado_empaque';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EstadosService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public getEstadosEmpaques(): Observable<EstadoEmpaque[]> {
        return this.http.get<EstadoEmpaque[]>(myGlobals.apiURL + myGlobals.ESTADO_EMPAQUES);
    }
}
