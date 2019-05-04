import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stock } from '../../../shared/product/stock/stock';
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stocks: Stock[] = [
    {
      _id: 1,
      product: 1,
      price: 1000,
      amount: 100,
      total: 100000,
      inventary: 'SKU4552S',
    },
    {
      _id: 2,
      product: 3,
      price: 1.10,
      amount: 100,
      total: 110,
      inventary: 'SKU4552S',
    },
    {
      _id: 3,
      product: 2,
      price: 20,
      amount: 100,
      total: 2000,
      inventary: 'SKU4552S',
    }
  ];
  constructor() {

  }
  public getStocks(): Observable<Stock[]> {
      return of(this.stocks);
  }

  public getStock(id: number): Observable<Stock> {
      return of(this.stocks.filter(p => p._id === id)[0]);
  }
  public getProductStock(id: number): Observable<Stock> {
      return of(this.stocks.filter(p => p.product === id)[0]);
  }
  // public firstEntry(id: number): Observable<Stock> {
  //   let flag: boolean;
  //     if ( this.stocks.filter(p => p.product === id).length > 0 ) {
  //       flag = true;
  //     } else {
  //       flag = false;
  //     }
  //     return flag;
  // }
}
