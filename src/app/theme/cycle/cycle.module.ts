import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { CycleRoutingModule } from './cycle-routing.module';

import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CycleListComponent } from './cycle-list/cycle-list.component';
import { ButtonComponent } from '../../theme/ui-elements/basic/button/button.component';

@NgModule({
  imports: [
    CommonModule,
    CycleRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [CycleListComponent]
})
export class CycleModule { }
