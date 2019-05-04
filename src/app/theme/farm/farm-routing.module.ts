import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FarmListComponent } from './farm-list/farm-list.component';
import { FarmCreateComponent } from './farm-create/farm-create.component';
import { FarmEditComponent } from './farm-edit/farm-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FarmListComponent,
    data: {
      title: 'Camaroneras',
      status: true
    }
  },
  {
    path: 'farm-create',
    component: FarmCreateComponent,
    data: {
      title: 'Crear Camaronera',
      status: true
    }
  },
  {
    path: 'farm-edit/:id',
    component: FarmEditComponent,
    data: {
      title: 'Editar Camaronera',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FarmRoutingModule { }
