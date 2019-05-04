import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { PtransferListComponent } from './ptransfer-list/ptransfer-list.component';
import { PtransferRoutingModule } from './ptransfer-routing.module';

import { FormsModule, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  imports: [
    CommonModule,
    PtransferRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule
  ],
  declarations: [PtransferListComponent]
})
export class PtransferModule { }
