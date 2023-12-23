import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import {UserDetailsRoutingModule} from "./user-details-routing.module";
import {CalendarModule} from "primeng/calendar";
import {ComponentsModule} from "../../../../shared/components/components.module";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {PipesModule} from "../../../../shared/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import {ToastModule} from "primeng/toast";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    CalendarModule,
    ComponentsModule,
    InputTextModule,
    PasswordModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
    TabViewModule,
    ToastModule,
    DropdownModule,
  ]
})
export class UserDetailsModule { }
