import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zem-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  image: any;

  constructor() {
    this.image = require('../../../public/img/logo-vertical.png');
 }

 ngOnInit() { }

}
