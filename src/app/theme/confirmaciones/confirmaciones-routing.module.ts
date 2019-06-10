import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmacionesListComponent } from './confirmaciones-list/confirmaciones-list.component';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacionesListComponent,
    data: {
      title: 'Confirmar Empaques',
      status: true
    } 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmacionesRoutingModule { }
