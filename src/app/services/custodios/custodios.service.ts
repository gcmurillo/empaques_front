import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Custodio, CustodioCreate, Correo, CorreoCrear } from '../../shared/custodio/custodio';
import { RepresentanteDetail, RepresentanteCreate } from '../../shared/representante/representante';
import { Vendedor, VendedorCreate } from '../../shared/vendedor/vendedor';
import { Empresa } from '../../shared/empresa/empresa';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs-compat/operator/retry';

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

    public getRepresentantes(): Observable<RepresentanteDetail[]> {
        return this.http.get<RepresentanteDetail[]>(myGlobals.apiURL + myGlobals.REPRESENTANTES);
    }

    public getVendedores(): Observable<Vendedor[]> {
        return this.http.get<Vendedor[]>(myGlobals.apiURL + myGlobals.VENDEDOR);
    }

    public getEmpresas(): Observable<Empresa[]>{
        return this.http.get<Empresa[]>(myGlobals.apiURL + myGlobals.EMPRESAS);
    }

    public addEmpresa(empresa: Empresa): Observable<Empresa> {
        return this.http.post<Empresa>(myGlobals.apiURL + myGlobals.EMPRESAS, empresa);
    } 

    public addRepre(repre: RepresentanteCreate): Observable<RepresentanteCreate> {
        return this.http.post<RepresentanteCreate>(myGlobals.apiURL + myGlobals.REPRESENTANTES, repre);
    }

    public addVendedor(vendedor: VendedorCreate): Observable<VendedorCreate> {
        return this.http.post<VendedorCreate>(myGlobals.apiURL + myGlobals.VENDEDOR, vendedor);
    }

    public addCustodio(custodio: CustodioCreate): Observable<CustodioCreate> {
        return this.http.post<CustodioCreate>(myGlobals.apiURL + myGlobals.CREAR_CUSTODIOS, custodio);
    }

    public getCorreos(): Observable<Correo[]>{
        return this.http.get<Correo[]>(myGlobals.apiURL + myGlobals.CORREOS);
    }

    public addCorreo(correo: CorreoCrear): Observable<Correo> {
        console.log(correo);
        return this.http.post<Correo>(myGlobals.apiURL + myGlobals.CORREOS, correo);
    }

}
