import { NgModule } from '@angular/core';
import {ConfigurationRoutingModule} from "./configuration-routing.module";
import {CommonModule} from "@angular/common";
import { ConfigurationComponent } from './configuration.component';

@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
  ]
})
export class ConfigurationModule { }
