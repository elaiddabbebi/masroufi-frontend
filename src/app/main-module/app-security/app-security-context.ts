import {Injectable} from "@angular/core";
import {AccountDetails} from "./types/account-details";
import {RoleType} from "../role/types/role-type";
import {Permission} from "../role/types/permission";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {AppSecurityService} from "./services/app-security.service";
import {MenuItem} from "primeng/api";
import {TranslatePipe} from "../../shared/pipes/translate.pipe";

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
        next: (response: AccountDetails) => {
          this.currentUser = response;
          this.fullName = response.fullName ? response.fullName : 'Unknown User';
          this.sidebarItems = response.items;
          this.sidebarItems?.forEach(item => {
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
}
