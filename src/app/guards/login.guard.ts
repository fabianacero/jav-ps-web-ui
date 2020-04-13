import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginService} from '../provider/login/login.service';
import {Routes} from '../enums/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router) {
  }

  canActivate(): boolean {
    const isLogged = this.login.isLogged();
    if (!isLogged) {
      this.router.navigate([Routes.LOGIN]);
    }
    return isLogged;
  }

}
