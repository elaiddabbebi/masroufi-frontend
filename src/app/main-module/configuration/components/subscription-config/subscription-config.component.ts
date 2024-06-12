import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from "../../services/configuration.service";
import {SubscriptionConfig} from "../../types/subscription-config";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryValidators} from "../../../../shared/validators/category-validators";
import {tap} from "rxjs";
import {getUTCDateFrom} from "../../../../shared/utils/utils-functions";

@Component({
  selector: 'app-subscription-config',
  templateUrl: './subscription-config.component.html',
  styleUrls: ['./subscription-config.component.css'],
  providers: [ConfigurationService],
})
export class SubscriptionConfigComponent implements OnInit {
  subscriptionConfigForm: FormGroup;

  constructor(
    private configurationService: ConfigurationService,
    private formBuilder: FormBuilder,
  ) {
    this.subscriptionConfigForm = this.formBuilder.group(
      {
        startDate: new FormControl(null, []),
        endDate: new FormControl(null, []),
      }
    );
  }

  private getSubscriptionConfig(): void {
    this.configurationService.getSubscriptionConfig().pipe(
      tap({
        next: (subscriptionConfig: SubscriptionConfig): void => {
          this.subscriptionConfigForm.get('startDate')?.setValue(
            subscriptionConfig.startDate ? getUTCDateFrom(new Date(subscriptionConfig.startDate)) : null
          );
          this.subscriptionConfigForm.get('startDate')?.disable();
          this.subscriptionConfigForm.get('endDate')?.setValue(
            subscriptionConfig.endDate ? getUTCDateFrom(new Date(subscriptionConfig.endDate)) : null
          );
          this.subscriptionConfigForm.get('endDate')?.disable();
        },
        error: error => {
          console.log(error);
        }
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.getSubscriptionConfig();
  }
}
