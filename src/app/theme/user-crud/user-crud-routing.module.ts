import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserEditComponent } from './user-edit/user-edit.component';
const routes: Routes = [
    {
        path: '',
        // loadChildren: './user-table/user-table.module#UserTableModule'
        component: UserTableComponent,
        data: {
            title: 'Usuarios',
            status: true
        }
    },
    {
        path: 'user-create',
        // loadChildren: './user-create/user-create.module#UserCreateModule'
        component: UserCreateComponent,
        data: {
            title: 'Crear Usuarios',
            status: true
        }
    },
    {
        path: 'user-edit/:id',
        component: UserEditComponent,
        data: {
            title: 'Editar Usuario',
            status: true
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserCrudRoutingModule { }
