import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "../shared/components/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      breadcrumb: 'DASHBOARD'
    },
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
    data: {
      breadcrumb: 'SETTINGS'
    }
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
export class MainRoutingModule { }

