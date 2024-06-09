import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CashFlowConfig} from "../../types/cash-flow-config";
import {ConfigurationService} from "../../services/configuration.service";
import {tap} from "rxjs";
import {NotificationService} from "../../../../shared/services/notification.service";

@Component({
  selector: 'app-cash-flow-config',
  templateUrl: './cash-flow-config.component.html',
  styleUrls: ['./cash-flow-config.component.css'],
  providers: [ConfigurationService, NotificationService]
})
export class CashFlowConfigComponent implements OnInit {

  cashFlowConfigFrom: FormGroup;
  saveIsLoading: boolean = false;
  currentConfig: CashFlowConfig;

  constructor(
    private configurationService: ConfigurationService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.cashFlowConfigFrom = this.formBuilder.group({
      initialCashAmount: new FormControl(0, [Validators.required])
    });

    this.currentConfig = {
      initialCashAmount: 0,
    }
  }

  get controls() {
    return this.cashFlowConfigFrom.controls;
  }

  ngOnInit(): void {
    this.getCashFlowConfig();
  }

  private populateCashFlowConfigForm(config: CashFlowConfig): void {
    this.cashFlowConfigFrom.get('initialCashAmount')?.setValue(config.initialCashAmount);
  }

  private getCashFlowConfig(): void {
    this.configurationService.getCashFlowConfig().pipe(
      tap({
        next: response => {
          if (response) {
            this.currentConfig = response;
            this.populateCashFlowConfigForm(response);
          }
        },
        error: error => {
          console.log(error);
        }
      })
    ).subscribe();
  }

  cancelUpdateCashFlowConfig(): void {
    this.populateCashFlowConfigForm(this.currentConfig);
  }

  updateCashFlowConfig(event: Event): void {
    event.stopPropagation();
    const config: CashFlowConfig = {
      initialCashAmount: this.cashFlowConfigFrom.value.initialCashAmount
    }
    this.saveIsLoading = true;
    this.configurationService.updateCashFlowConfig(config).pipe(
      tap({
        next: response => {
          this.saveIsLoading = false;
          this.currentConfig = response;
          this.populateCashFlowConfigForm(response);
          this.notificationService.notifySuccess('UPDATE_SUCCESS');
        },
        error: error => {
          this.saveIsLoading = false;
          console.log(error);
          this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

}
