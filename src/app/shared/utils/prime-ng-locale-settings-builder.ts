import {LocaleSettings} from "primeng/calendar";
import {Locale} from "../enums/locale";

export class PrimeNgLocaleSettingsBuilder {
  private static en: LocaleSettings = {
    firstDayOfWeek: 0,
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"],
    monthNames: [ "January","February","March","April","May","June","July","August","September","October","November","December" ],
    monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'mm/dd/yy',
    weekHeader: 'Wk'
  }

  private static fr: LocaleSettings = {
    firstDayOfWeek: 0,
    dayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
    dayNamesShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    dayNamesMin: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    monthNames: ["Janvier","Févrrier","Mars","Avril","May","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décember"],
    monthNamesShort: [ "Jan","Fév","Mar","Avr","May","Jun","Jul","Aoû","Sep","Oct","Nov","Déc" ],
    today: "Aujourd'hui",
    clear: 'Effacer',
    dateFormat: 'dd/mm/yy',
    weekHeader: 'Sm'
  }

  private static getLocale(): Locale {
    if (localStorage.getItem('locale') === 'EN') {
      return Locale.EN;
    } else {
      return Locale.FR;
    }
  }

  public static getLocaleSettings(): LocaleSettings {
    if (this.getLocale() === Locale.FR) {
      return this.fr;
    } else {
      return this.en;
    }
  }
}
