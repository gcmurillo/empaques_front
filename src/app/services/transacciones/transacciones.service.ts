import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Orden, TransaccionCreate } from '../../shared/orden/orden';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TransaccionesService {


    transaccion: Observable<any>;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public getTransacciones(): Observable<Orden[]> {
        return this.http.get<Orden[]>(myGlobals.apiURL + myGlobals.LISTAR_TRANSACCIONES);
    }

    public createTransaccion(transaccion: TransaccionCreate): Observable<TransaccionCreate> {
        return this.http.post<TransaccionCreate>(myGlobals.apiURL + myGlobals.CREAR_TRANSACCION, transaccion);
    }

}
