import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {TranslatePipe} from "./translate.pipe";
import {SpaceSeparatorPipe} from "./space-separator.pipe";



@NgModule({
  declarations: [
    TranslatePipe,
    SpaceSeparatorPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TranslatePipe,
    SpaceSeparatorPipe,
  ]
})
export class PipesModule { }
