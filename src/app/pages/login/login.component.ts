import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ServiceResponse} from '../../enums/service-response.enum';
import {Router} from '@angular/router';
import {Utilities} from '../../utilities/utilities';
import {LoginService} from '../../provider/login/login.service';
import {Routes} from '../../enums/routes.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private utilities: Utilities,
              private login: LoginService) {
  }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return false;
    }
    this.login.loginUser(loginForm, (response: any) => {
      if (response.status === ServiceResponse.SUCESS) {
        this.router.navigate([Routes.HOME]);
      }
    });
  }
}
