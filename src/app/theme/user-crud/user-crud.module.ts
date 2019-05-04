import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../shared/shared.module';
import {TreeModule} from 'angular-tree-component';

import { UserCrudRoutingModule } from './user-crud-routing.module';
import { UserTableComponent } from './user-table/user-table.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';


@NgModule({
  imports: [
    CommonModule,
    UserCrudRoutingModule,
    SharedModule,
    NgxDatatableModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule,
    TreeModule
  ],
  declarations: [
    // UserCrudComponent,
    UserEditComponent,
    UserTableComponent,
    UserCreateComponent
  ]
})
export class UserCrudModule {
}
