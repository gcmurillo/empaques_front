import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../shared/shared.module';

import { PoliciesRoutingModule } from './policies-routing.module';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';

import {DataTableModule} from 'angular2-datatable';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';

import { PoliciesListComponent } from './policies-list/policies-list.component';
import { PoliciesEditComponent } from './policies-edit/policies-edit.component';
import { PoliciesCreateComponent } from './policies-create/policies-create.component';

@NgModule({
  imports: [
    CommonModule,
    PoliciesRoutingModule,
    NgxDatatableModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    SharedModule
  ],
  declarations: [PoliciesListComponent, PoliciesEditComponent, PoliciesCreateComponent]
})
export class PoliciesModule { }
