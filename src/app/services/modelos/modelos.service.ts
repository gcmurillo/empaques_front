import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Modelo } from '../../shared/modelo/modelo';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public getModelos(): Observable<Modelo[]> {
        return this.http.get<Modelo[]>(myGlobals.apiURL + myGlobals.MODELOS);
    }
}
