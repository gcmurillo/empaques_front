import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Custodio } from '../../shared/custodio/custodio';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CustodiosService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }

    public getCustodios(): Observable<Custodio[]> {
        return this.http.get<Custodio[]>(myGlobals.apiURL + myGlobals.CUSTODIOS);
    }
}
