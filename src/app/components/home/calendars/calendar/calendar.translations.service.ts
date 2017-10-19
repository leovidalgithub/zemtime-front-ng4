import { Injectable } from '@angular/core';
import { GetCalendarServices } from './calendar.services';
// Jquery UI calendar translations service
@Injectable()
export class GetCalendarLangService {

  constructor(private ms: GetCalendarServices) {}

  // Depending on the lang that arrives choose one or other language
  getCalendarLang(lang) {
    this.ms.getTranslationJSON(lang)
      .subscribe(
        (value) => {
          console.log(value);
          return value;
        },
        (err) => { console.error(err); },
        () => {}
      );
  }
}


