import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { TreeModule } from 'angular-tree-component';

import { SowingRoutingModule } from './sowing-routing.module';
import { SowingListComponent } from './sowing-list/sowing-list.component';
import { SowingCreateComponent } from './sowing-create/sowing-create.component';

import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArchwizardModule } from 'ng2-archwizard/dist';

@NgModule({
  imports: [
    CommonModule,
    SowingRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    TreeModule
  ],
  declarations: [SowingListComponent, SowingCreateComponent]
})
export class SowingModule { }
