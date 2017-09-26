import { Component } from '@angular/core';
import { ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'zem-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // title: string;
  // image: any;

  // Sidebar
  // dataSidebar = [
  //   {
  //     roleAuth: [],
  //     url: 'notifications',
  //     icon: 'mdi-bell-outline',
  //     title: 'Notificaciones'
  //   }, {
  //     roleAuth: [],
  //     url: 'calendars',
  //     icon: 'mdi-calendar-range',
  //     title: 'Calendarios'
  //   }
  // ];

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

  constructor(private api: ApiService) {
    // this.title = this.api.title;
    // this.image = require('../public/img/logo-vertical.png');
  }

}
