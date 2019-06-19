import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Orden, TransaccionCreate, OrdenEmpaqueDetailList, OrdenEmpaqueDetailCreate } from '../../shared/orden/orden';

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

    public getOrdenesEmpaques(): Observable<OrdenEmpaqueDetailList[]> {
        return this.http.get<OrdenEmpaqueDetailList[]>(myGlobals.apiURL + myGlobals.LISTAR_ORDENESEMPAQUES);
    }

    public createOrdenEmpaque(orden: OrdenEmpaqueDetailCreate): Observable<OrdenEmpaqueDetailCreate> {
        return this.http.post<OrdenEmpaqueDetailCreate>(myGlobals.apiURL + myGlobals.CREAR_ORDENEMPAQUES, orden);
    }

    public editOrdenEmpaque(orden: OrdenEmpaqueDetailCreate, id): Observable<OrdenEmpaqueDetailCreate> {
        console.log(myGlobals.apiURL + 
            myGlobals.LISTAR_ORDENESEMPAQUES + id + '/');
        return this.http.put<OrdenEmpaqueDetailCreate>(myGlobals.apiURL + 
            myGlobals.LISTAR_ORDENESEMPAQUES + id + '/', orden);
    }

}
