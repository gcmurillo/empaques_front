import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
// import { AppComponent } from 'app.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: 'custodios',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'navigation',
                loadChildren: './theme/navigation/navigation.module#NavigationModule'
            },
            // empaques components
            {
                path: 'empaques',
                loadChildren: './theme/empaques/empaques.module#EmpaquesModule'
            },
            {
                path: 'custodios',
                loadChildren: './theme/custodios/custodios.module#CustodiosModule'
            },
            {
                path: 'transacciones',
                loadChildren: './theme/transacciones/transacciones.module#TransaccionesModule'
            },
            {
                path: 'operaciones',
                loadChildren: './theme/operaciones/operaciones.module#OperacionesModule'
            }
        ]
    },
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './theme/auth/auth.module#AuthModule'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
