import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SowingListComponent } from './sowing-list/sowing-list.component';
import { SowingCreateComponent } from './sowing-create/sowing-create.component';

const routes: Routes = [
    {
        path: '',
        component: SowingListComponent,
        data: {
            title: 'Siembras',
            status: true
        }
    },
    {
        path: 'sowing-create',
        component: SowingCreateComponent,
        data: {
            title: 'Nueva Siembra',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SowingRoutingModule { }
