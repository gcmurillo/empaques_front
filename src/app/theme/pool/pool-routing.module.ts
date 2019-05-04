import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoolListComponent } from './pool-list/pool-list.component';
import { PoolCreateComponent } from './pool-create/pool-create.component';
import { PoolEditComponent } from './pool-edit/pool-edit.component';

const routes: Routes = [
    {
        path: '',
        component: PoolListComponent,
        data: {
            title: 'Piscinas',
            status: true
        }
    },
    {
        path: 'pool-create',
        component: PoolCreateComponent,
        data: {
            title: 'Crear Piscina',
            status: true
        }
    },
    {
        path: 'pool-edit/:id',
        component: PoolEditComponent,
        data: {
            title: 'Editar Piscina',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoolRoutingModule { }
