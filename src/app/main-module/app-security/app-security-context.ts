import {Injectable} from "@angular/core";
import {AccountDetails} from "./types/account-details";
import {RoleType} from "../role/types/role-type";
import {Permission} from "../role/types/permission";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {AppSecurityService} from "./services/app-security.service";
import {MenuItem} from "primeng/api";
import {TranslatePipe} from "../../shared/pipes/translate.pipe";
import {AppLocale} from "../../shared/enums/appLocale";

@Injectable({
  providedIn: 'root'
})
export class AppSecurityContext {
  currentUser: AccountDetails | undefined;
  sidebarItems: MenuItem[] | undefined = [];
  fullName: string = '';

  constructor(
    private translate: TranslatePipe,
    private router: Router,
    private service: AppSecurityService,
  ) {}

  initContext(): Observable<AccountDetails> {
    return this.service.getAccountInfo().pipe(
      tap({
        next: (response: AccountDetails): void => {
          if (response.locale === AppLocale.EN) {
            localStorage.setItem('locale', 'EN');
          } else {
            localStorage.setItem('locale', 'FR');
          }
          this.currentUser = response;
          this.fullName = response.fullName ? response.fullName : 'Unknown User';
          this.sidebarItems = response.items;
          this.sidebarItems?.forEach((item: MenuItem): void => {
            this.translateMenuItemsLabels(item);
          });
        },
        error: (error) => {
          this.logout();
        }
      })
    );
  }

  translateMenuItemsLabels(item: MenuItem): void {
    if (item) {
      item.label = this.translate.transform(item.label ? item.label : '');
      if (item.items) {
        item.items.forEach(elt => {
          this.translateMenuItemsLabels(elt);
        })
      }
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null &&
            localStorage.getItem('access_token') !== undefined &&
            localStorage.getItem('access_token') !== '';
  }

  isSupperAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.role?.type === RoleType.SUPER_ADMIN;
    }
    return false;
  }

  isAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.role?.type === RoleType.ADMIN;
    }
    return false;
  }

  isCustomer(): boolean {
    if (this.currentUser) {
      return this.currentUser.role?.type === RoleType.CUSTOMER;
    }
    return false;
  }

  hasPermission(permission: Permission): boolean {
    if (this.currentUser) {
      const permissionIndex = this.currentUser.role?.permissions.indexOf(permission);
      return permissionIndex ? permissionIndex >= 0 : false;
    }
    return false;
  }

  getLocale(): AppLocale {
    return this.currentUser?.locale ? this.currentUser?.locale : AppLocale.FR;
  }
}
