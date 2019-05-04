import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Move } from '../../../shared/move/move';
import { Product } from '../../../shared/product/product';
import { ProductService} from '../product.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class MoveService {
private now = moment ();

private moves: Move[] = [
  {
    _id: 1,
    product: 1,
    date: this.now.format(),
    detail: 'proveedor factura  001-001-1234',
    type: 'ingreso',
    fix: false,
    quantity: 2,
    price: 10,
    amount: 20,
    quantityStock: 2,
    priceStock: 10,
    amountStock: 20,
  },
  {
    _id: 2,
    product: 1,
    date: this.now.add(1, 'days').format(),
    detail: 'proveedor factura  001-001-1266',
    type: 'ingreso',
    fix: false,
    quantity: 8,
    price: 10,
    amount: 80,
    quantityStock: 10,
    priceStock: 10,
    amountStock: 100,
  },
  {
    _id: 3,
    product: 1,
    date: this.now.add(2, 'days').format(),
    detail: 'proveedor factura  001-001-1271',
    type: 'ingreso',
    fix: false,
    quantity: 5,
    price: 15,
    amount: 75,
    quantityStock: 15,
    priceStock: 11.66,
    amountStock: 175,
  },
  {
    _id: 4,
    product: 1,
    date: this.now.add(3, 'days').format(),
    detail: 'orden 215145',
    type: 'egreso',
    fix: false,
    quantity: 5,
    price: 11.66,
    amount: 58.30,
    quantityStock: 10,
    priceStock: 11.66,
    amountStock: 116.67,
  },
  {
    _id: 5,
    product: 2,
    date: this.now.format(),
    detail: 'proveedor factura  001-001-1234',
    type: 'ingreso',
    fix: false,
    quantity: 5,
    price: 10,
    amount: 50,
    quantityStock: 5,
    priceStock: 10,
    amountStock: 50,
  },
  {
    _id: 6,
    product: 2,
    date: this.now.add(1, 'days').format(),
    detail: 'proveedor factura  001-001-1266',
    type: 'egreso',
    fix: false,
    quantity: 3,
    price: 10,
    amount: 30,
    quantityStock: 2,
    priceStock: 20,
    amountStock: 20,
  },
  {
    _id: 7,
    product: 3,
    date: this.now.add(2, 'days').format(),
    detail: 'proveedor factura  001-001-1271',
    type: 'ingreso',
    fix: false,
    quantity: 10,
    price: 1.10,
    amount: 11,
    quantityStock: 10,
    priceStock: 1.10,
    amountStock: 11,
  },
  {
    _id: 8,
    product: 3,
    date: this.now.add(3, 'days').format(),
    detail: 'orden 215145',
    type: 'egreso',
    fix: false,
    quantity: 1,
    price: 1.10,
    amount: 1.10,
    quantityStock: 9,
    priceStock: 1.10,
    amountStock: 9.90,
  }
];

  constructor() {
    // const now = moment();
  }
  public getMoves(): Observable<Move[]> {
      return of(this.moves);
  }

  public getMove(id: number): Observable<Move> {
      return of(this.moves.filter(p => p._id === id)[0]);
  }
}
