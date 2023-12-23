import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import {SettingsModule} from "./settings/settings.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MainComponent} from "./main.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import { ToastModule } from 'primeng/toast';
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SettingsModule,
    DashboardModule,
    SharedModule,
    BreadcrumbModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [MainComponent]
})
export class MainModule { }
