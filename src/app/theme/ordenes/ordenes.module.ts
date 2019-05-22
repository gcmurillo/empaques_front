import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenesRoutingModule } from './ordenes-routing.module';
import { OrdenesListComponent } from './ordenes-list/ordenes-list.component';


import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    OrdenesRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    SharedModule,
  ],
  declarations: [OrdenesListComponent]
})
export class OrdenesModule { }
