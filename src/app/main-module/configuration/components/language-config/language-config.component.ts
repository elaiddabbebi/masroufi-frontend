import {Component} from '@angular/core';
import {TranslatePipe} from "../../../../shared/pipes/translate.pipe";
import {Locale} from "../../../../shared/enums/locale";

@Component({
  selector: 'app-language-config',
  templateUrl: './language-config.component.html',
  styleUrls: ['./language-config.component.css'],
  providers: [TranslatePipe]
})
export class LanguageConfigComponent {

  languages: {label: string, value: Locale, flag: string}[] = [];
  language: Locale = this.getCurrentLanguage();

  constructor(
    private translatePipe: TranslatePipe
  ) {
    this.languages.push(
      {
        label: this.translatePipe.transform('FRENCH'),
        value: Locale.FR,
        flag: 'assets/img/france_flag.png'
      },
      {
        label: this.translatePipe.transform('ENGLISH'),
        value: Locale.EN,
        flag: 'assets/img/uk_flag.png'
      }
    )
  }

  getCurrentLanguage(): Locale {
    return localStorage.getItem('locale') === 'EN' ? Locale.EN : Locale.FR;
  }

  changeLanguage(): void {
    if (this.language === Locale.FR) {
      localStorage.setItem('locale', 'FR');
    } else {
      localStorage.setItem('locale', 'EN');
    }
    window.location.reload();
  }

}
