import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs";
import {AccountDetails} from "../app-security/types/account-details";
import {AppSecurityService} from "../app-security/services/app-security.service";
import {NotificationService} from "../../shared/services/notification.service";
import {TranslatePipe} from "../../shared/pipes/translate.pipe";
import {AccountPasswordModel} from "../app-security/types/account-password-model";
import {PrimeNgLocaleSettingsBuilder} from "../../shared/utils/prime-ng-locale-settings-builder";
import {PrimeNGConfig} from "primeng/api";
import {getUTCDateFrom} from "../../shared/utils/utils-functions";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AppSecurityService, NotificationService, TranslatePipe]
})
export class ProfileComponent implements OnInit {

  profileDetailsForm: FormGroup;
  passwordForm: FormGroup;
  loading: boolean = false;
  showUpdateDetailsFooter: boolean = false;
  showUpdatePasswordFooter: boolean = false;
  profileDetails: AccountDetails = {};

  constructor(
    private formBuilder: FormBuilder,
    private service: AppSecurityService,
    private notificationService: NotificationService,
    private translate: TranslatePipe,
    private primeNGConfig: PrimeNGConfig
  ) {
    this.primeNGConfig.setTranslation(PrimeNgLocaleSettingsBuilder.getLocaleSettings());
    this.profileDetailsForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      role: new FormControl('', [Validators.required]),
    });

    this.passwordForm = this.formBuilder.group({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      passwordConfirmation: new FormControl('', [Validators.required]),
    });

    this.passwordForm.valueChanges.subscribe(() => {
      this.showUpdatePasswordFooter = true;
    })
  }

  selectDate(date: Date): void {
    this.profileDetailsForm.get('birthDate')?.setValue(getUTCDateFrom(date));
  }

  get profileControls() {
    return this.profileDetailsForm.controls;
  }

  get passwordControls() {
    return this.passwordForm.controls;
  }

  ngOnInit(): void {
    this.getProfileDetails();
  }

  getProfileDetails(): void {
    this.service.getAccountInfo().pipe(
      tap({
        next: (response: AccountDetails) => {
          this.profileDetails = response;
          this.populateProfileFrom(response);
        },
        error: (error) => {
          this.notificationService.notifySuccess('ERROR');
        }
      })
    ).subscribe();
  }

  private populateProfileFrom(details: AccountDetails): void {
    this.profileDetailsForm.get('email')?.setValue(details.email);
    this.profileDetailsForm.get('phoneNumber')?.setValue(details.phoneNumber);
    this.profileDetailsForm.get('firstName')?.setValue(details.firstName);
    this.profileDetailsForm.get('lastName')?.setValue(details.lastName);
    this.profileDetailsForm.get('birthDate')?.setValue( details.birthDate ? new Date(details.birthDate) : null);
    this.profileDetailsForm.get('role')?.setValue(details.role ? this.translate.transform(details.role?.type.toString()) : null);

    this.profileDetailsForm.valueChanges.subscribe(() => {
      this.showUpdateDetailsFooter = true;
    })
  }

  updateProfileDetails(event: Event): void {
    event.stopPropagation();
    if (this.profileDetailsForm.invalid) {
      return;
    }
    this.loading = true;

    const details: AccountDetails = {
      email: this.profileDetailsForm.value.email,
      firstName: this.profileDetailsForm.value.firstName,
      lastName: this.profileDetailsForm.value.lastName,
      phoneNumber: this.profileDetailsForm.value.phoneNumber,
      birthDate: this.profileDetailsForm.value.birthDate,
    }
    this.service.updateAccountDetails(details).pipe(
      tap({
        next: (response: AccountDetails) => {
          this.profileDetails = response;
          this.populateProfileFrom(response);
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
    this.populateProfileFrom(this.profileDetails);
    this.showUpdateDetailsFooter = false;
  }

  updatePassword(event: Event): void {
    event.stopPropagation();
    if (this.passwordForm.invalid) {
      return;
    }
    const accountPassword: AccountPasswordModel = {
      oldPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword,
      passwordConfirmation: this.passwordForm.value.passwordConfirmation
    }
    this.service.updatePassword(accountPassword).pipe(
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
