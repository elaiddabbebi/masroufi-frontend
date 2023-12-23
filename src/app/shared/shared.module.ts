import { NgModule } from '@angular/core';
import {ComponentsModule} from "./components/components.module";
import {CommonModule} from "@angular/common";
import {PipesModule} from "./pipes/pipes.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PipesModule,
  ],
  exports: [
    ComponentsModule,
    PipesModule
  ]
})
export class SharedModule { }
