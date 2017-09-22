import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// declare var $: any;

@Component({
  selector: 'zem-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: object = {
    userName: '',
    password: ''
  };

  constructor(private router: Router) {}
  ngOnInit() { }

  login() {
    this.router.navigateByUrl('/home');
    console.log(`I'll take you to Dashboard and beyond!`);
  }

}
