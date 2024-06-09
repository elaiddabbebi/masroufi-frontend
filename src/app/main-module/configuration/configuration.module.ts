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
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {ComponentsModule} from "../../shared/components/components.module";
import {InputTextModule} from "primeng/inputtext";
import { LanguageConfigComponent } from './components/language-config/language-config.component';
import {FieldsetModule} from "primeng/fieldset";

@NgModule({
  declarations: [
    ConfigurationComponent,
    CashFlowConfigComponent,
    SubscriptionConfigComponent,
    LanguageConfigComponent
  ],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        PipesModule,
        SharedModule,
        TabViewModule,
        ToastModule,
        ReactiveFormsModule,
        PasswordModule,
        ComponentsModule,
        InputTextModule,
        FieldsetModule,
    ]
})
export class ConfigurationModule { }
