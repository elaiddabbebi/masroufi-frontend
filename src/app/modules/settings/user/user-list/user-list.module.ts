import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import {UserListRoutingModule} from "./user-list-routing.module";
import { TableModule } from 'primeng/table';
import {PipesModule} from "../../../../shared/pipes/pipes.module";
import {TagModule} from "primeng/tag";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {ComponentsModule} from "../../../../shared/components/components.module";
import {ToastModule} from "primeng/toast";
import {InputTextareaModule} from "primeng/inputtextarea";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    TableModule,
    PipesModule,
    TagModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    ComponentsModule,
    ToastModule,
    InputTextareaModule,
    CalendarModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
  ]
})
export class UserListModule { }
