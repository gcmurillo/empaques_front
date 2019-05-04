import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { Category } from '../../../shared/product/category/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    {
      _id: '1',
      name: 'comerciales',
      code: 120,
      detail: 'mercancias',
      parent: null,

    },
    {
      _id: '2',
      name: 'materias primas',
      code: 100,
      detail: 'coategorias de materias primas',
      parent: null,
    },
    {
      _id: '3',
      name: 'producto en curso',
      code: 150,
      detail: 'categorias de products en curso',
      parent: null,
    }
  ];
  constructor() { }
  public getCategories(): Observable<Category[]> {
      return of(this.categories);
  }
  public getCategory(id: string): Observable<Category> {
      return of(this.categories.filter(p => p._id === id)[0]);
  }
}
