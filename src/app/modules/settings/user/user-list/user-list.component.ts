import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {UserService} from "../services/user.service";
import {tap} from "rxjs";
import {AccountDetails} from "../../../types/account-details";
import {NotificationService} from "../../../services/notification.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../role/services/role.service";
import {Role} from "../../../types/role";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [TranslatePipe, UserService, NotificationService, RoleService]
})
export class UserListComponent implements OnInit {

  userList: AccountDetails[] = [];
  roleList: Role[] = [];
  userDetailsForm: FormGroup;
  activateDeactivateAccountDialog: boolean = false;
  deleteAccountDialog: boolean = false;
  addAccountDialog: boolean = false;
  currentAccountFullName: string = '';
  currentAccountUuid: string = '';
  isActivation: boolean = false;
  deleteIsLoading: boolean = false;
  addIsLoading: boolean = false;
  activateDeactivateIsLoading: boolean = false;

  constructor(
    private router: Router,
    private translate: TranslatePipe,
    private service: UserService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
    this.userDetailsForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', []),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, []),
      role: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.searchUsers();
    this.searchRoles();
  }

  initializeUserDetailsForm(): void {
    this.userDetailsForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', []),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, []),
      role: new FormControl('', [Validators.required]),
    });
  }

  get userDetailsControls() {
    return this.userDetailsForm.controls;
  }

  showActivateDeactivateAccountDialog(): void {
    this.activateDeactivateAccountDialog = true;
  }

  hideActivateDeactivateAccountDialog(): void {
    this.activateDeactivateAccountDialog = false;
  }

  showDeleteAccountDialog(): void {
    this.deleteAccountDialog = true;
  }

  hideDeleteAccountDialog(): void {
    this.deleteAccountDialog = false;
  }

  showAddAccountDialog(): void {
    this.addAccountDialog = true;
  }

  hideAddAccountDialog(): void {
    this.addAccountDialog = false;
  }

  activateAccount(user: any): void {
    this.currentAccountFullName = user.fullName;
    this.currentAccountUuid = user.uuid;
    this.isActivation = true;
    this.showActivateDeactivateAccountDialog();
  }

  deactivateAccount(user: any): void {
    this.currentAccountFullName = user.fullName;
    this.currentAccountUuid = user.uuid;
    this.isActivation = false;
    this.showActivateDeactivateAccountDialog();
  }

  deleteAccount(user: any): void {
    this.currentAccountFullName = user.fullName;
    this.currentAccountUuid = user.uuid;
    this.showDeleteAccountDialog();
  }

  addAccount(): void {
    this.initializeUserDetailsForm();
    this.showAddAccountDialog();
  }

  searchUsers(): void {
    this.service.searchUserList().pipe(
      tap({
        next: (response: AccountDetails[]) => {
          this.userList = response;
        },
        error: (error) => {
          // this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

  searchRoles(): void {
    this.roleService.getAllRoles().pipe(
      tap({
        next: (response: Role[]) => {
          this.roleList = response;
        },
        error: (error) => {
          // this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

  activateDeactivateSelectedUser(event: Event): void {
    event.stopPropagation();
    this.activateDeactivateIsLoading = true;
    this.service.activateDeactivateUser(this.currentAccountUuid, this.isActivation).pipe(
      tap({
        next: (response) => {
          this.activateDeactivateIsLoading = false;
          this.hideActivateDeactivateAccountDialog();
          if (this.isActivation) {
            this.notificationService.notifySuccess('USER_ACTIVATED_SUCCESS');
          } else {
            this.notificationService.notifySuccess('USER_DEACTIVATED_SUCCESS');
          }
          this.searchUsers();
        },
        error: (error) => {
          this.activateDeactivateIsLoading = false;
          this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

  deleteSelectedUser(event: Event): void {
    event.stopPropagation();
    this.deleteIsLoading = true;
    this.service.deleteUser(this.currentAccountUuid).pipe(
      tap({
        next: (response) => {
          this.deleteIsLoading = false;
          this.hideDeleteAccountDialog();
          this.notificationService.notifySuccess('USER_DELETED_SUCCESS');
          this.searchUsers();
        },
        error: (error) => {
          this.deleteIsLoading = false;
          this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

  editUser(user: any): void {
    this.router.navigate(['/main/settings/users/details'], {queryParams: {uuid: user.uuid}});
  }

  createUser(event: Event): void {
    event.stopPropagation();
    if (this.userDetailsForm.invalid) {
      return;
    }
    if (!this.roleList.filter(role => role.uuid === this.userDetailsForm.value.role) ||
      this.roleList.filter(role => role.uuid === this.userDetailsForm.value.role).length === 0) {
      return;
    }
    this.addIsLoading = true;
    const userDetails: AccountDetails = {
      email: this.userDetailsForm.value.email,
      firstName: this.userDetailsForm.value.firstName,
      lastName: this.userDetailsForm.value.lastName,
      role: this.roleList.filter(role => role.uuid === this.userDetailsForm.value.role)[0]
    };
    this.service.createUser(userDetails).pipe(
      tap({
        next: (response: AccountDetails) => {
          this.hideAddAccountDialog();
          this.notificationService.notifySuccess('USER_CREATION_SUCCESS');
          this.searchUsers();
          this.addIsLoading = false;
        },
        error: (error) => {
          this.notificationService.notifyError('USER_CREATION_ERROR');
          this.addIsLoading = false;
        }
      })
    ).subscribe();
  }
}
