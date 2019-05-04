import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Category } from '../../../shared/product/category/category';
@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private subcategories: Category[] = [
    {
      _id: '1',
      name: 'lacteos',
      code: 188,
      detail: 'subcategoria de productos lacteos',
      parent: 120,

    },
    {
      _id: '2',
      name: 'limpieza',
      code: 150,
      detail: 'subcategorias de productos de limpieza',
      parent: 120,
    },
    {
      _id: '3',
      name: 'agricola',
      code: 250,
      detail: 'subcategoria de productos agricolas',
      parent: 100,
    },
    {
      _id: '4',
      name: 'quimicos',
      code: 300,
      detail: 'subcategoria de productos agricolas',
      parent: 100,
    }
 ];  constructor() { }
  public getSubcategories(): Observable<Category[]> {
      return of(this.subcategories);
  }
  public getSubcategory(id: string): Observable<Category> {
      return of(this.subcategories.filter(p => p._id === id)[0]);
  }
}
