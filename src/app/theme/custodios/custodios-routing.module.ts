import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustodiosListComponent } from './custodios-list/custodios-list.component';
import { CustodiosCreateComponent } from './custodios-create/custodios-create.component';

const routes: Routes = [
    {
        path: '',
        component: CustodiosListComponent,
        data: {
            title: 'Custodios',
            status: true
        }
    },
    {
        path: 'custodios-create',
        component: CustodiosCreateComponent,
        data: {
            title: 'Crear Custodio',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustodiosRoutingModule { }
