import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import '../style/app.scss';

@Component({
  selector: 'zem-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('en');

    let browserLang = this.translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');
  }

  ngOnInit() {
    console.log('AppComponent');
    console.log(this.translate.getLangs());
    console.log(this.translate.currentLang);
  }


}
