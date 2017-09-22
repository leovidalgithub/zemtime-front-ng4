import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../shared';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return  this.userService.isLoggedIn();
  }
}
