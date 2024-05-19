import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import {StatisticsRoutingModule} from "./statistics-routing.module";
import { ChartModule } from 'primeng/chart';
import {FieldsetModule} from "primeng/fieldset";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {SharedModule} from "primeng/api";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ComponentsModule} from "../../shared/components/components.module";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";

@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    ChartModule,
    FieldsetModule,
    PipesModule,
    SharedModule,
    InputTextareaModule,
    SharedModule,
    ComponentsModule,
    DropdownModule,
    PaginatorModule,
    ReactiveFormsModule,
    CalendarModule
  ]
})
export class StatisticsModule { }
