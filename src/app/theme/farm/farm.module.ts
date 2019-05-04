import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../shared/shared.module';
import {IOption} from 'ng-select';
import { FarmRoutingModule } from './farm-routing.module';
import { FarmListComponent } from './farm-list/farm-list.component';
import { FarmCreateComponent } from './farm-create/farm-create.component';
import { FarmEditComponent } from './farm-edit/farm-edit.component';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';

@NgModule({
  imports: [
    CommonModule,
    FarmRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
  ],
  declarations: [
    FarmListComponent,
    FarmCreateComponent,
    FarmEditComponent]
})
export class FarmModule { }
