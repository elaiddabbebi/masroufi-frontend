import {Component} from '@angular/core';
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {AppLocale} from "../../../../shared/enums/appLocale";
import {ConfigurationService} from "../../services/configuration.service";
import {tap} from "rxjs";
import {NotificationService} from "../../../../shared/services/notification.service";

@Component({
  selector: 'app-language-config',
  templateUrl: './language-config.component.html',
  styleUrls: ['./language-config.component.css'],
  providers: [TranslatePipe, ConfigurationService, NotificationService]
})
export class LanguageConfigComponent {

  languages: {label: string, value: AppLocale, flag: string}[] = [];
  language: AppLocale = this.getCurrentLanguage();
  updateLanguageIsLoading: boolean = false;

  constructor(
    private translatePipe: TranslatePipe,
    private configurationService: ConfigurationService,
    private notificationService: NotificationService,
  ) {
    this.languages.push(
      {
        label: this.translatePipe.transform('FRENCH'),
        value: AppLocale.FR,
        flag: 'assets/img/france_flag.png'
      },
      {
        label: this.translatePipe.transform('ENGLISH'),
        value: AppLocale.EN,
        flag: 'assets/img/uk_flag.png'
      }
    )
  }

  getCurrentLanguage(): AppLocale {
    return localStorage.getItem('locale') === 'EN' ? AppLocale.EN : AppLocale.FR;
  }

  changeLanguage(event: Event): void {
    event.stopPropagation();
    this.updateLanguageIsLoading = true;
    this.configurationService.updateLanguageConfig(this.language).pipe(
      tap({
        next: (locale: AppLocale): void => {
          this.updateLanguageIsLoading = false;
          window.location.reload();
        },
        error: (error: any): void => {
          console.error(error);
          this.updateLanguageIsLoading = false;
          this.notificationService.notifyError('ERROR_OCCURRED');
        }
      })
    ).subscribe();
  }

}
