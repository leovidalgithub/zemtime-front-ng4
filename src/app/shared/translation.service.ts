import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TranslationService {

  constructor(private translate: TranslateService) {}

  getTranslation(value): Observable<string> {
    return this.translate.get(value)
      .map(thisValue => thisValue);
  }

}
