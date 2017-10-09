import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import '../style/app.scss';

@Component({
  selector: 'zem-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private  translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('es');

    let browserLang = this.translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'es');
  }

}
