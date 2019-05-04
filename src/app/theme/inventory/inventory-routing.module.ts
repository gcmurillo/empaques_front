import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryIncomeComponent } from './inventory-income/inventory-income.component';
import { InventoryDepartureComponent } from './inventory-departure/inventory-departure.component';
import { ProductKardexComponent } from './product-kardex/product-kardex.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryListComponent,
    data: {
      title: 'Registro de movimientos',
      status: true
    }
  },
  {
    path: 'inventory-income',
    component: InventoryIncomeComponent,
    data: {
      title: 'Nuevo ingreso',
      status: true
    }
  },
  {
    path: 'kardex/:id',
    component: ProductKardexComponent,
    data: {
      title: 'Kardes de Producto',
      status: true
    }
  },
  {
    path: 'inventory-departure',
    component: InventoryDepartureComponent,
    data: {
      title: 'nuevo egreso',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
