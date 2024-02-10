import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "../../shared/components/not-found/not-found.component";
import {CashFlowRegistryComponent} from "./cash-flow-registry.component";

const routes: Routes = [
  {
    path: '',
    component: CashFlowRegistryComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      breadcrumb: 'PAGE_NOT_FOUND'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashFlowRegistryRoutingModule { }
