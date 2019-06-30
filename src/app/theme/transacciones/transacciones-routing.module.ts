import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionesListComponent } from './transacciones-list/transacciones-list.component';
import { TransaccionesDespComponent } from './transacciones-desp/transacciones-desp.component';
import { TransaccionesCreateComponent } from './transacciones-create/transacciones-create.component';

const routes: Routes = [
    {
        path: 'no-desp',
        component: TransaccionesListComponent,
        data: {
            title: 'Transacciones',
            status: true
        }
    },
    {
        path: 'create',
        component: TransaccionesCreateComponent,
        data: {
            title: 'Crear Transacciones',
            status: true
        }
    },
    {
        path: 'desp',
        component: TransaccionesDespComponent,
        data: {
            title: 'Transacciones Despachadas',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransaccionesRoutingModule { }
