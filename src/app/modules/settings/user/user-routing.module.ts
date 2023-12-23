import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "../../../shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user-list/user-list.module').then((m) => m.UserListModule),
    pathMatch: 'full',
  },
  {
    path: 'details',
    loadChildren: () => import('./user-details/user-details.module').then((m) => m.UserDetailsModule),
    data: {
      breadcrumb: 'USER_DETAILS'
    },
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
export class UserRoutingModule { }
