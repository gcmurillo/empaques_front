import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmacionesRoutingModule } from './confirmaciones-routing.module';
import { ConfirmacionesListComponent } from './confirmaciones-list/confirmaciones-list.component';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    ConfirmacionesRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    SharedModule,
  ],
  declarations: [ConfirmacionesListComponent]
})
export class ConfirmacionesModule { }
