import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {PipesModule} from "../../../shared/pipes/pipes.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CalendarModule } from 'primeng/calendar';
import {SharedModule} from "../../../shared/shared.module";
import { TabMenuModule } from 'primeng/tabmenu';
import {BadgeModule} from "primeng/badge";
import { TabViewModule } from 'primeng/tabview';
import {PasswordModule} from "primeng/password";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    InputTextModule,
    PipesModule,
    ReactiveFormsModule,
    CalendarModule,
    SharedModule,
    TabMenuModule,
    BadgeModule,
    TabViewModule,
    PasswordModule,
    ToastModule,
  ]
})
export class ProfileModule { }
