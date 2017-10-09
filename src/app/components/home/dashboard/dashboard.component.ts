import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'zem-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  // Header data
  sectionData = {
    title: 'dashboard.title',
    titleClass: 'mdi mdi-bell-outline',
    notificationShow: false,
    spanShow: false
  };
  actionsShow = {
    showActions: false
  };


  constructor(private translate: TranslateService) {

  }

  ngOnInit() {

  }

}
