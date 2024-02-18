import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../../shared/shared.module";
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { SupperAdminDashboardComponent } from './components/supper-admin-dashboard/supper-admin-dashboard.component';
import {DashboardService} from "./services/dashboard.service";
import {FieldsetModule} from "primeng/fieldset";


@NgModule({
  declarations: [
    DashboardComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    SupperAdminDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FieldsetModule,
  ],
  providers: [
    DashboardService,
  ]
})
export class DashboardModule { }
