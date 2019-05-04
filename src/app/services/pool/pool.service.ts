import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Farm } from '../../shared/farm/farm';
import { Pool } from '../../shared/pool/pool';

import * as myGlobals from '../../shared/globals/globals';

import { FarmService } from '../farm/farm.service';

import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PoolService {

    farms: Farm[] = [];
    pool_list: Pool[];

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient, private farmService: FarmService) {
        this.farmService.getFarms().subscribe(farmResult => this.farms = farmResult);
        this.pool_list = [
            {
                _id: 'abcdef5555',
                code: '1255588',
                description: 'easy cam pool 1',
                farm: {
                    _id: 'dasdwe55555',
                    name: 'EM1',
                    detail: 'Detail',
                    locate: '152255',
                    area: 2000,
                },
            }
        ];
    }

    public getPools(): Observable<Pool[]> {
        return of(this.pool_list);
    }

    public getPool(id: string): Observable<Pool> {
        return of(this.pool_list.filter(p => p._id === id)[0]);
    }

}
