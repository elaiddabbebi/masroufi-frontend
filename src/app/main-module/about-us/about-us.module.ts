import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import {AboutUsRoutingModule} from "./about-us-routing.module";
import {ComponentsModule} from "../../shared/components/components.module";
import {FieldsetModule} from "primeng/fieldset";
import {PipesModule} from "../../shared/pipes/pipes.module";
import {SharedModule} from "primeng/api";

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    ComponentsModule,
    FieldsetModule,
    PipesModule,
    SharedModule
  ]
})
export class AboutUsModule { }
