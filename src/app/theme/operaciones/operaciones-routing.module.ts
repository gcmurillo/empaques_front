import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmacionesListComponent } from './confirmaciones-list/confirmaciones-list.component';
import { RetornosListComponent } from './retornos-list/retornos-list.component';
import { LlenadoListComponent } from './llenado-list/llenado-list.component';

const routes: Routes = [
  {
    path: 'confirmaciones',
    component: ConfirmacionesListComponent,
    data: {
      title: 'Confirmar Empaques',
      status: true
    } 
  },
  {
    path: 'retornos',
    component: RetornosListComponent,
    data: {
      title: 'Retornos Empaques',
      status: true
    } 
  },
  {
    path: 'llenado',
    component: LlenadoListComponent,
    data: {
      title: 'Retornos Empaques',
      status: true
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionesRoutingModule { }
