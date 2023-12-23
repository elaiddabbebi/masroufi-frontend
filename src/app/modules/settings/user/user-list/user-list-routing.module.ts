import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "../../../../shared/components/not-found/not-found.component";
import {UserListComponent} from "./user-list.component";

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
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
export class UserListRoutingModule { }
