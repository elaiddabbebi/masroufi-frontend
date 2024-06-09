import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "../../shared/components/not-found/not-found.component";
import {NgModule} from "@angular/core";
import {KpiComponent} from "./kpi.component";

const routes: Routes = [
  {
    path: '',
    component: KpiComponent,
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
export class KpiRoutingModule { }
