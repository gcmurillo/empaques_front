import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpaquesListComponent } from './empaques-list/empaques-list.component';
import { EmpaquesCreateComponent } from './empaques-create/empaques-create.component';

const routes: Routes = [
    {
        path: '',
        component: EmpaquesListComponent,
        data: {
            title: 'Empaques',
            status: true
        }
    },
    {
        path: 'empaques-create',
        component: EmpaquesCreateComponent,
        data: {
            title: 'Crear Empaques',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpaquesRoutingModule { }
