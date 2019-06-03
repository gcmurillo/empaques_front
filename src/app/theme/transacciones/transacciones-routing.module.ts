import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransaccionesListComponent } from './transacciones-list/transacciones-list.component';
import { TransaccionesCreateComponent } from './transacciones-create/transacciones-create.component';

const routes: Routes = [
    {
        path: '',
        component: TransaccionesListComponent,
        data: {
            title: 'Transacciones',
            status: true
        }
    },
    {
        path: 'transacciones-create',
        component: TransaccionesCreateComponent,
        data: {
            title: 'Crear Transacciones',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransaccionesRoutingModule { }
