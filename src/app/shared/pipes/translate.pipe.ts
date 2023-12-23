import {Pipe, PipeTransform} from '@angular/core';
import {Locale} from "../enums/locale";
import frJson from '../../../assets/i18n/fr.json';
import enJson from '../../../assets/i18n/en.json';

const frLanguage = <JSON><unknown>Object.assign({}, frJson);
const enLanguage = <JSON><unknown>Object.assign({}, enJson);

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

  private getLocale(): Locale {
    if (localStorage.getItem('locale') === 'EN') {
      return Locale.EN;
    } else {
      return Locale.FR;
    }
  }

  private translate(key: string, locale: Locale) {
    if (locale === Locale.FR) {
      // @ts-ignore
      return frLanguage[key];
    } else {
      // @ts-ignore
      return enLanguage[key];
    }
  }
}
