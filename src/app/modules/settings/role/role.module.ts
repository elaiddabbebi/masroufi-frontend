import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import {RoleRoutingModule} from "./role-routing.module";
import {ButtonModule} from "primeng/button";
import {ComponentsModule} from "../../../shared/components/components.module";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PipesModule} from "../../../shared/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TagModule} from "primeng/tag";
import {ToastModule} from "primeng/toast";
import {TooltipModule} from "primeng/tooltip";
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  declarations: [
    RoleComponent
  ],
    imports: [
      CommonModule,
      RoleRoutingModule,
      ButtonModule,
      ComponentsModule,
      DialogModule,
      DropdownModule,
      InputTextModule,
      InputTextareaModule,
      PipesModule,
      ReactiveFormsModule,
      SharedModule,
      TableModule,
      TagModule,
      ToastModule,
      TooltipModule,
      MultiSelectModule
    ]
})
export class RoleModule { }
