import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionesListComponent } from './transacciones-list/transacciones-list.component';

const routes: Routes = [
    {
        path: '',
        component: TransaccionesListComponent,
        data: {
            title: 'Transacciones',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransaccionesRoutingModule { }
