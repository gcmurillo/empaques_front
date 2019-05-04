import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CycleListComponent } from './cycle-list/cycle-list.component';

const routes: Routes = [
    {
        path: '',
        component: CycleListComponent,
        data: {
            title: 'Ciclos',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CycleRoutingModule { }
