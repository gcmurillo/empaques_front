import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpaquesRoutingModule } from './empaques-routing.module';
import { EmpaquesCreateComponent } from './empaques-create/empaques-create.component';
import { EmpaquesListComponent } from './empaques-list/empaques-list.component';

@NgModule({
  imports: [
    CommonModule,
    EmpaquesRoutingModule
  ],
  declarations: [EmpaquesCreateComponent, EmpaquesListComponent]
})
export class EmpaquesModule { }
