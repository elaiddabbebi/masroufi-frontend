import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashFlowRegistryComponent } from './cash-flow-registry.component';
import {CashFlowRegistryRoutingModule} from "./cash-flow-registry-routing.module";
import {AutoCompleteModule} from "primeng/autocomplete";
import {ButtonModule} from "primeng/button";
import {CheckboxModule} from "primeng/checkbox";
import {ComponentsModule} from "../../shared/components/components.module";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
import {CalendarModule} from "primeng/calendar";



@NgModule({
  declarations: [
    CashFlowRegistryComponent
  ],
  imports: [
    CommonModule,
    CashFlowRegistryRoutingModule,
    AutoCompleteModule,
    ButtonModule,
    CheckboxModule,
    ComponentsModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
    TableModule,
    TagModule,
    ToastModule,
    TooltipModule,
    CalendarModule,
  ]
})
export class CashFlowRegistryModule { }
