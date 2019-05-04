import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from '../../shared/company/company';
import { Farm } from '../../shared/farm/farm';
import { Warehouse } from '../../shared/warehouse/warehouse';
import * as myGlobals from '../../shared/globals/globals';

import { FarmService } from '../farm/farm.service';
import { WarehouseService } from '../warehouse/warehouse.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class CompanyService {

    farms: Farm[];
    warehouses: Warehouse[];

    // private companies: Company[];

    companyObservable: Observable<Company[]>;
    companies: Observable<any>;
    companie_list: Company[];

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) {
    }

    public getCompanies(): Observable<Company[]> {
        return this.http.get<Company[]>(myGlobals.apiURL + 'companies');
    }

    public getCompany(id: string): Observable<Company> {
        // return of(this.companie_list.filter(p => p._id === id)[0]);
        return this.http.get<Company>(myGlobals.apiURL + 'companies/' + id);
    }

    public addCompany(company: Company): Observable<Company> {
        return this.http.post<Company>(myGlobals.apiURL + 'companies/', company);
    }

    public deleteCompany(company: Company): Observable<Object> {
        return this.http.delete(myGlobals.apiURL + 'companies/' + company._id);
    }

    public updateCompany(company: Company): Observable<Object> {
        const putURL = myGlobals.apiURL + 'companies/' + company._id;
        return this.http.put(putURL, company);
    }

}
