// *************************************************** //
// Home Component is the parent route of all the app components routes except the Auth Component, which contains session login.
// It accomplish two basic functions:
//    . Integrates Sidebar Component and gives it his data
//    . Has the #mainWrapper where the router-outlet loads all the content of the app
// *************************************************** //

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  xxx = 'EPA';

  // Sidebar
  headSidebar = {
    logoLink: 'dashboard',
    userLink: 'dashboard',
    userName: 'Nombre'
  };
  dataSidebar = [
    {
      roleAuth: [],
      url: 'dashboard',
      icon: 'mdi-bell-outline',
      title: 'Notificaciones'
    }, {
      roleAuth: [],
      url: 'calendars',
      icon: 'mdi-calendar-range',
      // title: 'Calendarioss'
      title: this.fn('asw')
    }
  ];

  fn(name) {
    return name.toUpperCase();
  }

  constructor() { }

  ngOnInit() { }

}
