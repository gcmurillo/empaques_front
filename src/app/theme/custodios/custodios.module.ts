import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustodiosRoutingModule } from './custodios-routing.module';
import { CustodiosCreateComponent } from './custodios-create/custodios-create.component';
import { CustodiosListComponent } from './custodios-list/custodios-list.component';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import {SharedModule} from '../../shared/shared.module';
import {SelectModule} from 'ng-select';
import {TagInputModule} from 'ngx-chips';
// import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    CustodiosRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    SharedModule,
    SelectModule,
    TagInputModule,
    // NgSelectModule,
  ],
  declarations: [CustodiosCreateComponent, CustodiosListComponent]
})
export class CustodiosModule { }
