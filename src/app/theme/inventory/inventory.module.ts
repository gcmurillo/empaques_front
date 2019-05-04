import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';
// import { SelectModule } from 'ng-select';
import {TagInputModule} from 'ngx-chips';
// import {IOption} from 'ng-select';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryIncomeComponent } from './inventory-income/inventory-income.component';
import { InventoryDepartureComponent } from './inventory-departure/inventory-departure.component';

import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
// import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { ProductKardexComponent } from './product-kardex/product-kardex.component';
@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    SharedModule,
    FormsModule,
    // SelectModule,
    TagInputModule,
    NgxDatatableModule,
    // DataTableModule,
    ReactiveFormsModule,
    ArchwizardModule,
    NgSelectModule
  ],
  declarations: [
    InventoryListComponent,
    InventoryIncomeComponent,
    InventoryDepartureComponent,
    ProductKardexComponent
  ]
})
export class InventoryModule { }
