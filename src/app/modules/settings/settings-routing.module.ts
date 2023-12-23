import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "../../shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    data: {
      breadcrumb: 'MY_PROFILE'
    },
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    data: {
      breadcrumb: 'USERS'
    },
  },
  {
    path: 'roles',
    loadChildren: () => import('./role/role.module').then((m) => m.RoleModule),
    data: {
      breadcrumb: 'ROLES'
    },
  },
  {
    path: 'lists',
    loadChildren: () => import('./list/list.module').then((m) => m.ListModule),
    data: {
      breadcrumb: 'LISTS'
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
export class SettingsRoutingModule { }
