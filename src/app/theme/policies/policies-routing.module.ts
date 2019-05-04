import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PoliciesListComponent } from './policies-list/policies-list.component';
import { PoliciesEditComponent } from './policies-edit/policies-edit.component';
import { PoliciesCreateComponent } from './policies-create/policies-create.component';

const routes: Routes = [
    {
        path: '',
        component: PoliciesListComponent,
        data: {
            title: 'Politicas',
            status: true
        }
    },
    {
        path: 'policies-create',
        component: PoliciesCreateComponent,
        data: {
            title: 'Crear Politica',
            status: true
        }
    },
    {
        path: 'policies-edit/:id',
        component: PoliciesEditComponent,
        data: {
            title: 'Editar Politica',
            status: true
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliciesRoutingModule { }
