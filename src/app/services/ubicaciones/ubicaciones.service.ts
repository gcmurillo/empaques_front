import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Ubicacion } from '../../shared/ubicacion/ubicacion';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UbicacionesService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public getUbicaciones(): Observable<Ubicacion[]> {
        return this.http.get<Ubicacion[]>(myGlobals.apiURL + myGlobals.UBICACIONES);
    }

}
