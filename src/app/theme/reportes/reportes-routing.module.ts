import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdenesReporteComponent } from './ordenes/ordenes-reporte.component';

const routes: Routes = [
    {
        path: '',
        component: OrdenesReporteComponent,
        data: {
            title: 'Reporte Ordenes',
            status: true
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportesRoutingModule { }
