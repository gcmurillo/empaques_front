import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesListComponent } from './ordenes-list/ordenes-list.component';

const routes: Routes = [
    {
        path: '',
        component: OrdenesListComponent,
        data: {
            title: 'Ordenes',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenesRoutingModule { }
