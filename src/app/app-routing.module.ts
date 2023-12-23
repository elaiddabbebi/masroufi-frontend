import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {MainComponent} from "./modules/main.component";
import {AuthenticationComponent} from "./authentication/authentication.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      }
    ]
  },
  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/main.module').then((m) => m.MainModule),
      }
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
