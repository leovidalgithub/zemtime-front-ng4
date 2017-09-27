import { Component } from '@angular/core';
import { ApiService } from './shared';

import '../style/app.scss';

@Component({
  selector: 'zem-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private api: ApiService) {

  }

}
