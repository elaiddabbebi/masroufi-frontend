import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {TranslatePipe} from "../../pipes/translate.pipe";
import {Locale} from "../../enums/locale";
import {Router} from "@angular/router";
import {AppSecurityContext} from "../../../main-module/app-security/app-security-context";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  providers: [TranslatePipe]
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private translate: TranslatePipe,
    private router: Router,
    private appSecurityContext: AppSecurityContext,
  ) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: this.translate.transform(this.getCurrentLanguage()),
        icon: 'pi pi-fw pi-globe',
        items: [
          {
            label: this.translate.transform(this.getOtherLanguage()),
            command: (event: MenuItemCommandEvent): void => {
              this.changeLanguage();
            }
          }
        ]
      },
      {
        label: this.appSecurityContext.fullName,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: this.translate.transform('MY_PROFILE'),
            icon: 'pi pi-fw pi-user',
            command: (event: MenuItemCommandEvent): void => {
              this.router.navigate(['/main/profile']);
            }
          },
          {
            label: this.translate.transform('CONFIGURATION'),
            icon: 'pi pi-fw pi-cog',
            command: (event: MenuItemCommandEvent): void => {
              this.router.navigate(['/main/configuration']);
            }
          },
          {
            label: this.translate.transform('ABOUT'),
            icon: 'pi pi-fw pi-info-circle',
            command: (event: MenuItemCommandEvent): void => {
              this.router.navigate(['/main/about']);
            }
          },
          {
            label: this.translate.transform('SIGN_OUT'),
            icon: 'pi pi-fw pi-power-off',
            command: (event: MenuItemCommandEvent): void => {
              this.logout();
            }
          },
        ]
      }
    ];
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  getCurrentLanguage() {
    const locale = localStorage.getItem('locale') === 'EN' ? Locale.EN : Locale.FR;
    if (locale === Locale.EN) {
      return 'EN';
    } else {
      return 'FR';
    }
  }

  getOtherLanguage() {
    const locale = localStorage.getItem('locale') === 'EN' ? Locale.EN : Locale.FR;
    if (locale === Locale.FR) {
      return 'ENGLISH';
    } else {
      return 'FRENCH';
    }
  }

  changeLanguage() {
    const locale = localStorage.getItem('locale') === 'EN' ? Locale.EN : Locale.FR;
    if (locale === Locale.FR) {
      localStorage.setItem('locale', 'EN');
    } else {
      localStorage.setItem('locale', 'FR');
    }
    window.location.reload();
  }
}
