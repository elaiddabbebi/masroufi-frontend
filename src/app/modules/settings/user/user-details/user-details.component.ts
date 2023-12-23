import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountDetails} from "../../../types/account-details";
import {NotificationService} from "../../../services/notification.service";
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {tap} from "rxjs";
import {AccountPasswordModel} from "../../profile/types/account-password-model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Role} from "../../../types/role";
import {RoleService} from "../../role/services/role.service";
import {RoleType} from "../../../types/role-type";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [UserService, RoleService, NotificationService, TranslatePipe]
})
export class UserDetailsComponent implements OnInit {

  readonly RoleType = RoleType;

  uuid: string = '';
  userDetailsForm: FormGroup;
  passwordForm: FormGroup;
  loading: boolean = false;
  showUpdateDetailsFooter: boolean = false;
  showUpdatePasswordFooter: boolean = false;
  userDetails: AccountDetails = {};
  roleList: Role[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private roleService: RoleService,
    private notificationService: NotificationService,
    private translate: TranslatePipe,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userDetailsForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });

    this.passwordForm = this.formBuilder.group({
      newPassword: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.showUpdatePasswordFooter = true;
    })
  }

  get userControls() {
    return this.userDetailsForm.controls;
  }

  get passwordControls() {
    return this.passwordForm.controls;
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe((params: Params) => {
          this.uuid = params['uuid'];
          if (!this.uuid || this.uuid === '') {
            this.router.navigate(['/main/not-fount']);
          } else {
            this.getUserDetails();
            this.searchRoles();
          }
        }
      );
  }

  getUserDetails(): void {
    this.service.getUserDetails(this.uuid).pipe(
      tap({
        next: (response: AccountDetails) => {
          this.userDetails = response;
          this.populateUserDetailsFrom(response);
        },
        error: (error) => {
          this.notificationService.notifySuccess('ERROR_OCCURRED');
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

  private populateUserDetailsFrom(details: AccountDetails): void {
    this.userDetailsForm.get('email')?.setValue(details.email);
    this.userDetailsForm.get('phoneNumber')?.setValue(details.phoneNumber);
    this.userDetailsForm.get('firstName')?.setValue(details.firstName);
    this.userDetailsForm.get('lastName')?.setValue(details.lastName);
    this.userDetailsForm.get('birthDate')?.setValue( details.birthDate ? new Date(details.birthDate) : null);
    this.userDetailsForm.get('role')?.setValue(details.role ? details.role.uuid : null);

    this.userDetailsForm.valueChanges.subscribe(() => {
      this.showUpdateDetailsFooter = true;
    })
  }

  updateUserDetails(event: Event): void {
    event.stopPropagation();
    if (this.userDetailsForm.invalid) {
      return;
    }
    if (this.roleList.filter(role => role.uuid === this.userDetailsForm.value.role)?.length <= 0) {
      return;
    }

    this.loading = true;

    const details: AccountDetails = {
      email: this.userDetailsForm.value.email,
      firstName: this.userDetailsForm.value.firstName,
      lastName: this.userDetailsForm.value.lastName,
      phoneNumber: this.userDetailsForm.value.phoneNumber,
      birthDate: this.userDetailsForm.value.birthDate,
      role: this.roleList.filter(role => role.uuid === this.userDetailsForm.value.role)[0]
    }
    this.service.updateUserDetails(this.uuid, details).pipe(
      tap({
        next: (response: AccountDetails) => {
          this.userDetails = response;
          this.populateUserDetailsFrom(response);
          this.loading = false;
          this.showUpdateDetailsFooter = false;
          this.notificationService.notifySuccess('UPDATE_SUCCESS');
        },
        error: (error) => {
          this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

  cancelUpdateDetails(): void {
    this.populateUserDetailsFrom(this.userDetails);
    this.showUpdateDetailsFooter = false;
  }

  updatePassword(event: Event): void {
    event.stopPropagation();
    if (this.passwordForm.invalid) {
      return;
    }
    const accountPassword: AccountPasswordModel = {
      newPassword: this.passwordForm.value.newPassword,
      passwordConfirmation: this.passwordForm.value.passwordConfirmation
    }
    this.service.updateUserPassword(this.uuid, accountPassword).pipe(
      tap({
        next: (response) => {
          this.passwordForm.reset();
          this.showUpdatePasswordFooter = false;
          this.notificationService.notifySuccess('UPDATE_SUCCESS');
        },
        error: (error) => {
          this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

  cancelUpdatePassword(): void {
    this.passwordForm.reset();
    this.showUpdatePasswordFooter = false;
  }
}
