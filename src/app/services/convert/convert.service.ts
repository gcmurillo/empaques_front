import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Convert} from '../../shared/convert/convert';
@Injectable({
  providedIn: 'root'
})
export class ConvertService {
  private converts: Convert[] = [
    {
      id: 1,
      startUnit: 'kilogramos',
      endUnit: 'libras',
      factor: 2.2046,
    },
    {
      id: 2,
      startUnit: 'kilogramos',
      endUnit: 'gramos',
      factor: 1000,
    },
    {
      id: 3,
      startUnit: 'kilogramos',
      endUnit: 'onzas',
      factor: 35.274,
    },
    {
      id: 4,
      startUnit: 'litro',
      endUnit: 'centimetros cubicos',
      factor: 1000,
    },
    {
      id: 4,
      startUnit: 'litro',
      endUnit: 'metros cubicos',
      factor: 0.001,
    },
    {
      id: 4,
      startUnit: 'litro',
      endUnit: 'galon',
      factor: 0.26417,
    },
  ];
  constructor() { }
  public getConverts(): Observable<Convert[]> {
      return of(this.converts);
  }
  public getConvert(id: number): Observable<Convert> {
      return of(this.converts.filter(p => p.id === id)[0]);
  }
}
