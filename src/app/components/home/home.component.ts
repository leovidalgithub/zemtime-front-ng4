// *************************************************** //
// Home Component is the parent route of all the app components routes except the Auth Component, which contains session login.
// It accomplish two basic functions:
//    . Integrates Sidebar Component and gives it his data
//    . Has the #mainWrapper where the router-outlet loads all the content of the app
// *************************************************** //

import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../../shared';

@Component({
  selector: 'zem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // SIDEBAR DATA
  // tslint:disable-next-line:no-unused-variable
  private sidebarData: object = {
    headSidebar: {
      logoLink: 'dashboard',
      userLink: 'dashboard',
      userName: 'Nombre',
      closeMenu: this.myTranslate.getTranslation('general.sidebar.menuClose'),
      reportBug: this.myTranslate.getTranslation('general.sidebar.bugReport'),
      signOut: this.myTranslate.getTranslation('general.sidebar.logout')
    },
    dataSidebar: [
      {
        roleAuth: [],
        url: 'dashboard',
        icon: 'mdi-bell-outline',
        title: this.myTranslate.getTranslation('dashboard.title')
      }, {
        roleAuth: [],
        url: 'calendars',
        icon: 'mdi-calendar-range',
        title: this.myTranslate.getTranslation('calendars.title')
      },
    ],
  };

  constructor(private myTranslate: TranslationService) { }

  ngOnInit() { }

}
