import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../shared/shared.module';

import { PoolRoutingModule } from './pool-routing.module';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { PoolListComponent } from './pool-list/pool-list.component';
import { PoolCreateComponent } from './pool-create/pool-create.component';
import { PoolEditComponent } from './pool-edit/pool-edit.component';

@NgModule({
  imports: [
    CommonModule,
    PoolRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule
  ],
  declarations: [PoolListComponent, PoolCreateComponent, PoolEditComponent]
})
export class PoolModule { }
