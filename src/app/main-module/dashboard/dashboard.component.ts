import {Component, OnInit} from '@angular/core';
import {AppSecurityContext} from "../app-security/app-security-context";
import {AccountDetails} from "../app-security/types/account-details";
import {RoleType} from "../role/types/role-type";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isSupperAdmin: boolean = false;
  isAdmin: boolean = false;
  isCustomer: boolean = false;
  constructor(
    private appSecurityContext: AppSecurityContext
  ) {}

  ngOnInit(): void {
    this.appSecurityContext.initContext().subscribe((response: AccountDetails): void => {
      if (response) {
        if (response.role?.type === RoleType.SUPER_ADMIN) {
          this.isSupperAdmin = true;
        } else if (response.role?.type === RoleType.ADMIN) {
          this.isAdmin = true;
        } else {
          this.isCustomer = true;
        }
      }
    });
  }
}
