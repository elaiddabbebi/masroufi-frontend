import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserDetailsComponent} from "./user-details.component";
import {NotFoundComponent} from "../../../../shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
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
export class UserDetailsRoutingModule { }
