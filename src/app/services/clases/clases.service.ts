import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Clase } from '../../shared/clase/clase';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClasesService {

    constructor(private http: HttpClient) { }

    public getClases(): Observable<Clase[]> {
        return this.http.get<Clase[]>(myGlobals.apiURL + myGlobals.CLASES);
    }

}
