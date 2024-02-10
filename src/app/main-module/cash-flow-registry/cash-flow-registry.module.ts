import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashFlowRegistryComponent } from './cash-flow-registry.component';
import {CashFlowRegistryRoutingModule} from "./cash-flow-registry-routing.module";



@NgModule({
  declarations: [
    CashFlowRegistryComponent
  ],
  imports: [
    CommonModule,
    CashFlowRegistryRoutingModule,
  ]
})
export class CashFlowRegistryModule { }
