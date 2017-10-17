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

  constructor(private api: ApiService) {
    // this.title = this.api.title;
    // this.image = require('../public/img/logo-vertical.png');
  }

}
