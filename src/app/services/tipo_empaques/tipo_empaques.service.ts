import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TipoEmpaque } from '../../shared/tipo_empaque/tipo_empaque';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TipoEmpaquesService {

    tipo_empaque: Observable<any>;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public getTipoEmpaques(): Observable<TipoEmpaque[]> {
        return this.http.get<TipoEmpaque[]>(myGlobals.apiURL + myGlobals.TIPO_EMPAQUES);
    }

}
