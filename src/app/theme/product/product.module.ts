import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule} from '../../shared/shared.module';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDepartureComponent } from './product-departure/product-departure.component';
import { ProductIncomeComponent } from './product-income/product-income.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
// import {DataTableModule} from 'angular2-datatable';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
// import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ArchwizardModule} from 'ng2-archwizard/dist';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSubcategoryComponent } from './product-subcategory/product-subcategory.component';
import { ConvertListComponent } from './convert-list/convert-list.component';
@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    NgxDatatableModule,
    NgSelectModule,
    // DataTableModule,
    // DataTableComponent,
    FormsModule,
    ReactiveFormsModule,
    ArchwizardModule
  ],
  declarations: [
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDepartureComponent,
    ProductIncomeComponent,
    ProductCategoryComponent,
    ProductSubcategoryComponent,
    ConvertListComponent
  ]
})
export class ProductModule { }
