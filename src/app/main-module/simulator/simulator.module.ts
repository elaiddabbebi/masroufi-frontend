import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulatorComponent } from './simulator.component';
import {SimulatorRoutingModule} from "./simulator-routing.module";



@NgModule({
  declarations: [
    SimulatorComponent
  ],
  imports: [
    CommonModule,
    SimulatorRoutingModule,
  ]
})
export class SimulatorModule { }
