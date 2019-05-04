import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Farm, FarmWithCompany } from '../../shared/farm/farm';

import * as myGlobals from '../../shared/globals/globals';

import { Company } from '../../shared/company/company';
import { CompanyService } from '../company/company.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FarmService {

    companies = [];
    private farms: Farm[] = [];
    selected_farms = [];
    company: Company;
    selected_farm: Farm;

    constructor(private companyService: CompanyService, private http: HttpClient) {

    }

    listFarms() {
        this.farms = [];
        const company_farms = [];
        this.companies.map(item => {
            item.farms.map(farm => {
                farm.company = item;
                return farm;
            });
            this.farms.push(...item.farms);
        });
    }

    public getFarms(): Observable<Farm[]> {
        return this.http.get<Farm[]>(myGlobals.apiURL + 'companies/farms');
    }

    public deleteFarm(farm: FarmWithCompany): Observable<Object> {
        const company = farm.company;
        const farms_company = company.farms;
        farms_company.splice(farms_company.indexOf(farm), 1);
        company.farms = farms_company;
        return this.companyService.updateCompany(company);
    }

}
