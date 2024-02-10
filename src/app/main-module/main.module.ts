import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import {ConfigurationModule} from "./configuration/configuration.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {MainComponent} from "./main.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {CardModule} from "primeng/card";
import { ToastModule } from 'primeng/toast';
import {MessageService} from "primeng/api";
import {AppSecurityContext} from "./app-security/app-security-context";
import {AppSecurityService} from "./app-security/services/app-security.service";
import {TranslatePipe} from "../shared/pipes/translate.pipe";

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ConfigurationModule,
    DashboardModule,
    SharedModule,
    BreadcrumbModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService, AppSecurityService, AppSecurityContext, TranslatePipe],
  bootstrap: [MainComponent]
})
export class MainModule { }
