import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
    ]
})
export class DashboardModule { }
