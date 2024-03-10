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
    path: 'cash-flow',
    loadChildren: () => import('./cash-flow-list/cash-flow-list.module').then((m) => m.CashFlowListModule),
    data: {
      breadcrumb: 'CASH_FLOW'
    },
  },
  {
    path: 'cash-flow-registry',
    loadChildren: () => import('./cash-flow-registry/cash-flow-registry.module').then((m) => m.CashFlowRegistryModule),
    data: {
      breadcrumb: 'CASH_FLOW_REGISTRY'
    },
  },
  {
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then((m) => m.StatisticsModule),
    data: {
      breadcrumb: 'STATISTICS'
    },
  },
  {
    path: 'simulator',
    loadChildren: () => import('./simulator/simulator.module').then((m) => m.SimulatorModule),
    data: {
      breadcrumb: 'SIMULATOR'
    },
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
    data: {
      breadcrumb: 'MY_PROFILE'
    },
  },
  {
    path: 'configuration',
    loadChildren: () => import('./configuration/configuration.module').then((m) => m.ConfigurationModule),
    data: {
      breadcrumb: 'CONFIGURATION'
    }
  },
  {
    path: 'about',
    loadChildren: () => import('./about-us/about-us.module').then((m) => m.AboutUsModule),
    data: {
      breadcrumb: 'ABOUT_US'
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

