import { NgModule } from '@angular/core';
import {ConfigurationRoutingModule} from "./configuration-routing.module";
import {CommonModule} from "@angular/common";
import { ConfigurationComponent } from './configuration.component';
import { CashFlowConfigComponent } from './components/cash-flow-config/cash-flow-config.component';
import { SubscriptionConfigComponent } from './components/subscription-config/subscription-config.component';
import {PipesModule} from "../../shared/pipes/pipes.module";
import {SharedModule} from "primeng/api";
import {TabViewModule} from "primeng/tabview";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    ConfigurationComponent,
    CashFlowConfigComponent,
    SubscriptionConfigComponent
  ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        PipesModule,
        SharedModule,
        TabViewModule,
        ToastModule,
    ]
})
export class ConfigurationModule { }
