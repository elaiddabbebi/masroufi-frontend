import {Component, OnInit} from '@angular/core';
import {Role} from "../../types/role";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TranslatePipe} from "../../../shared/pipes/translate.pipe";
import {NotificationService} from "../../services/notification.service";
import {RoleService} from "./services/role.service";
import {tap} from "rxjs";
import {Permission} from "../../types/permission";
import {RoleType} from "../../types/role-type";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  providers: [TranslatePipe, NotificationService, RoleService]
})
export class RoleComponent implements OnInit {

  permissionList: Permission[] = [];
  roleList: Role[] = [];
  roleTypeList: any[] = [];
  roleForm: FormGroup;
  deleteRoleDialog: boolean = false;
  addEditRoleDialog: boolean = false;
  currentRoleName: string = '';
  currentRoleUuid: string = '';
  deleteIsLoading: boolean = false;
  addEditIsLoading: boolean = false;
  mode: string = 'add';
  uuid: string = '';

  constructor(
    private router: Router,
    private translate: TranslatePipe,
    private service: RoleService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private roleService: RoleService
  ) {
    this.roleForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', []),
      permissions: new FormControl([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.initializeRoleTypeList();
    this.searchRoles();
    this.searchPermissions();
  }

  initializeRoleForm(): void {
    this.roleForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', []),
      permissions: new FormControl([], [Validators.required]),
    });
  }

  initializeRoleTypeList(): void {
    this.roleTypeList = [
      {
        key: this.translate.transform(RoleType.SUPER_ADMIN),
        value: RoleType.SUPER_ADMIN
      },
      {
        key: this.translate.transform(RoleType.ADMIN),
        value: RoleType.ADMIN
      },
      {
        key: this.translate.transform(RoleType.CUSTOMER),
        value: RoleType.CUSTOMER
      },
    ]
  }

  get roleControls() {
    return this.roleForm.controls;
  }

  showDeleteRoleDialog(): void {
    this.deleteRoleDialog = true;
  }

  hideDeleteRoleDialog(): void {
    this.deleteRoleDialog = false;
  }

  showAddEditRoleDialog(): void {
    this.addEditRoleDialog = true;
  }

  hideAddEditRoleDialog(): void {
    this.addEditRoleDialog = false;
  }

  deleteRole(user: any): void {
    this.currentRoleName = user.name;
    this.currentRoleUuid = user.uuid;
    this.showDeleteRoleDialog();
  }

  setupCreateRole(): void {
    this.mode = 'add';
    this.uuid = '';
    this.initializeRoleForm();
    this.showAddEditRoleDialog();
  }

  searchPermissions(): void {
    this.service.getAllPermissions().pipe(
      tap({
        next: (response: Permission[]) => {
          response.forEach(permission => {
            permission.name = this.translate.transform(permission.type);
          })
          this.permissionList = response;
        },
        error: (error) => {
          console.log(error);
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
          console.log(error);
        }
      })
    ).subscribe();
  }

  deleteSelectedRole(event: Event): void {
    event.stopPropagation();
    this.deleteIsLoading = true;
    this.service.deleteRole(this.currentRoleUuid).pipe(
      tap({
        next: (response: Role) => {
          this.deleteIsLoading = false;
          this.hideDeleteRoleDialog();
          this.notificationService.notifySuccess('ROLE_DELETED_SUCCESS');
          this.searchRoles();
        },
        error: (error) => {
          this.deleteIsLoading = false;
          this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

  setupUpdateRole(role: any): void {
    this.mode = 'edit';
    this.uuid = role.uuid;
    this.roleForm.get('name')?.setValue(role.name);
    this.roleForm.get('type')?.setValue(role.type);
    role.permissions.forEach((permission: any) => {
      permission.name = this.translate.transform(permission.type);
    });
    this.roleForm.get('permissions')?.setValue(role.permissions);
    this.showAddEditRoleDialog();
  }

  saveRole(event: Event): void {
    if (this.mode === 'add') {
      this.createRole(event);
    } else {
      this.updateRole(event);
    }
  }

  createRole(event: Event): void {
    event.stopPropagation();
    if (this.roleForm.invalid) {
      return;
    }
    this.addEditIsLoading = true;
    const roleToCreate: Role = {
      name: this.roleForm.value.name,
      type: this.roleForm.value.type,
      permissions: this.roleForm.value.permissions
    };
    this.service.createRole(roleToCreate).pipe(
      tap({
        next: (response: Role) => {
          this.hideAddEditRoleDialog();
          this.notificationService.notifySuccess('ROLE_CREATION_SUCCESS');
          this.searchRoles();
          this.addEditIsLoading = false;
        },
        error: (error) => {
          this.notificationService.notifyError('ERROR_OCCURRED');
          this.addEditIsLoading = false;
        }
      })
    ).subscribe();
  }

  updateRole(event: Event): void {
    event.stopPropagation();
    if (this.roleForm.invalid) {
      return;
    }
    this.addEditIsLoading = true;
    const roleToUpdate: Role = {
      uuid: this.uuid,
      name: this.roleForm.value.name,
      type: this.roleForm.value.type,
      permissions: this.roleForm.value.permissions
    };
    this.service.updateRole(roleToUpdate).pipe(
      tap({
        next: (response: Role) => {
          this.hideAddEditRoleDialog();
          this.notificationService.notifySuccess('ROLE_UPDATE_SUCCESS');
          this.searchRoles();
          this.addEditIsLoading = false;
        },
        error: (error) => {
          this.notificationService.notifyError('ERROR_OCCURRED');
          this.addEditIsLoading = false;
        }
      })
    ).subscribe();
  }
}
