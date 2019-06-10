import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmacionesRoutingModule } from './confirmaciones-routing.module';
import { ConfirmacionesListComponent } from './confirmaciones-list/confirmaciones-list.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmacionesRoutingModule
  ],
  declarations: [ConfirmacionesListComponent]
})
export class ConfirmacionesModule { }
