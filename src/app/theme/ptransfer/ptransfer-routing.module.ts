import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PtransferListComponent } from './ptransfer-list/ptransfer-list.component';

const routes: Routes = [
    {
        path: '',
        component: PtransferListComponent,
        data: {
            title: 'Transferencia de Produccion',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PtransferRoutingModule { }
