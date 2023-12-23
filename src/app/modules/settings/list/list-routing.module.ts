import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "../../../shared/components/not-found/not-found.component";
import {ListComponent} from "./list.component";

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
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
export class ListRoutingModule { }
