import {Component} from '@angular/core';
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {AppLocale} from "../../../../shared/enums/appLocale";

@Component({
  selector: 'app-language-config',
  templateUrl: './language-config.component.html',
  styleUrls: ['./language-config.component.css'],
  providers: [TranslatePipe]
})
export class LanguageConfigComponent {

  languages: {label: string, value: AppLocale, flag: string}[] = [];
  language: AppLocale = this.getCurrentLanguage();

  constructor(
    private translatePipe: TranslatePipe
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

  changeLanguage(): void {
    if (this.language === AppLocale.FR) {
      localStorage.setItem('locale', 'FR');
    } else {
      localStorage.setItem('locale', 'EN');
    }
    window.location.reload();
  }

}
