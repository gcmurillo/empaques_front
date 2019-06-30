import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaccionesRoutingModule } from './transacciones-routing.module';
import { TransaccionesListComponent } from './transacciones-list/transacciones-list.component';
import { TransaccionesDespComponent } from './transacciones-desp/transacciones-desp.component';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {SharedModule} from '../../shared/shared.module';
import { TransaccionesCreateComponent } from './transacciones-create/transacciones-create.component';

@NgModule({
  imports: [
    CommonModule,
    TransaccionesRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    SharedModule,
  ],
  declarations: [TransaccionesListComponent, TransaccionesCreateComponent, TransaccionesDespComponent]
})
export class TransaccionesModule { }
