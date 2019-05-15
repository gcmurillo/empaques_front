import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Marca } from '../../shared/marca/marca';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class MarcasService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public getMarcas(): Observable<Marca[]> {
        return this.http.get<Marca[]>(myGlobals.apiURL + myGlobals.MARCAS);
    }

    public addMarca(marca: Marca): Observable<Marca> {
        return this.http.post<Marca>(myGlobals.apiURL + myGlobals.MARCAS, marca);
    }

}
