import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Warehouse} from '../../shared/warehouse/warehouse';
import {Company} from '../../shared/company/company';

import * as myGlobals from '../../shared/globals/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  warehouseObservable: Observable<Warehouse[]>;
  warehouse: Observable<any>;
  warehouse_list: Warehouse[];

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }
  public getWarehouses(): Observable<Warehouse[]> {
      // return of(this.warehouses);
      return this.http.get<Warehouse[]>(myGlobals.apiURL + 'warehouses');
  }
  public getWarehouse(id: string): Observable<Warehouse> {
      // return of(this.warehouses.filter(p => p.id === id)[0]);
      return this.http.get<Warehouse>(myGlobals.apiURL + 'warehouses/' + id);
  }

  public addWarehouse(warehouse: Warehouse): Observable<Warehouse> {
      return this.http.post<Warehouse>(myGlobals.apiURL + 'warehouses/', warehouse);
  }

  public getWarehouseOfCompany(company: Company): Observable<Warehouse[]> {
      return this.http.get<Warehouse[]>(myGlobals.apiURL + 'companies/' + company._id + '/warehouses');
  }

  public updateWarehouse(warehouse: Warehouse): Observable<Object> {
      const putURL = myGlobals.apiURL + 'warehouses/' + warehouse._id;
      console.log(warehouse);
      return this.http.put(putURL, warehouse);
  }

}
