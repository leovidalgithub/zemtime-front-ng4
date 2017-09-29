import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ApiService } from '../../../shared/index';

@Component({
  selector: 'zem-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // HEADER
  sectionData = {
    title: 'Notificaciones',
    titleClass: 'mdi mdi-bell-outline',
    notificationShow: true,
    notificationCondition: '1',
    notificationResult: '3',
    span: 'Calendario Barcelona',
    spanShow: true
  };

  actionsShow = {
    showActions: true
  };

  actionButtons = [
    {
      text:  'Botón 1',
      buttonClass: 'bt-act',
      title: false,
      show:  true,
      clickAction: function(){
        alert('clicar el botón 1');
      }
      // clickParameters: '',
    }, {
      text:  'Botón 2',
      buttonClass: 'bt-pos',
      title: false,
      show:  true,
      clickAction: function(){
        alert('clicar el botón 2');
      },
      // clickParameters: '',
    }
  ];

  constructor(private  translate: TranslateService, private ap: ApiService) {
    translate.addLangs(['en', 'fr', 'es']);
    translate.setDefaultLang('en');

    let browserLang = this.translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    console.log('browserLang',  browserLang);
  }

  ngOnInit() {
    console.log(this.translate.getLangs());
    console.log(this.translate.currentLang);
    console.log(this.ap.getData());

  }

}
