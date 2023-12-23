import {Component, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import {TranslatePipe} from "../../pipes/translate.pipe";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [TranslatePipe]
})
export class SideBarComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(
    private translate: TranslatePipe
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: this.translate.transform('DASHBOARD'),
        icon: 'pi pi-fw pi-home',
        routerLink: '/main/dashboard',
        visible: true,
      },
      {
        label: this.translate.transform('SETTINGS'),
        icon: 'pi pi-fw pi-cog',
        expanded: true,
        visible: true,
        items: [
          {
            label: this.translate.transform('MY_PROFILE'),
            icon: 'pi pi-fw pi-user',
            routerLink: '/main/settings/profile',
            visible: true,
          },
          {
            label: this.translate.transform('USERS'),
            icon: 'pi pi-fw pi-users',
            routerLink: '/main/settings/users',
            visible: true,
          },
          {
            label: this.translate.transform('ROLES'),
            icon: 'pi pi-fw pi-cog',
            routerLink: '/main/settings/roles',
            visible: true,
          },
          {
            label: this.translate.transform('LISTS'),
            icon: 'pi pi-fw pi-list',
            routerLink: '/main/settings/lists',
            visible: true,
          },
        ]
      },
    ];
  }
}
