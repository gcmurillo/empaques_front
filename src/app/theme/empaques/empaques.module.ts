import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpaquesRoutingModule } from './empaques-routing.module';
import { EmpaquesCreateComponent } from './empaques-create/empaques-create.component';
import { EmpaquesListComponent } from './empaques-list/empaques-list.component';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EmpaquesRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    SharedModule,
  ],
  declarations: [EmpaquesCreateComponent, EmpaquesListComponent]
})
export class EmpaquesModule { }
