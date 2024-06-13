import {Pipe, PipeTransform} from '@angular/core';
import {AppLocale} from "../enums/appLocale";
import frJson from '../../../assets/i18n/fr.json';
import enJson from '../../../assets/i18n/en.json';

const frLanguage: JSON = <JSON><unknown>Object.assign({}, frJson);
const enLanguage: JSON = <JSON><unknown>Object.assign({}, enJson);

@Pipe({name: 'translate'})
export class TranslatePipe implements PipeTransform {

  transform(key: string): string {
    const locale = this.getLocale();
    const result = this.translate(key, locale);
    if (result) {
      return result;
    } else {
      return key;
    }
  }

  private getLocale(): AppLocale {
    if (localStorage.getItem('locale') === 'EN') {
      return AppLocale.EN;
    } else {
      return AppLocale.FR;
    }
  }

  private translate(key: string, locale: AppLocale) {
    if (locale === AppLocale.FR) {
      // @ts-ignore
      return frLanguage[key];
    } else {
      // @ts-ignore
      return enLanguage[key];
    }
  }
}
