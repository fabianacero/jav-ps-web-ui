import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Utilities} from '../../utilities/utilities';
import {LoginService} from '../../provider/login/login.service';
import {Routes} from '../../enums/routes.enum';
import {Session} from '../../models/session';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public routes = Routes;
  public errorMessage: string;
  public errorCode: string;

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
    this.login.loginUser(loginForm).subscribe((session: Session) => {
      this.utilities.saveOnSession('session', session);
      this.router.navigate([Routes.APP]);
    }, (error) => {
      this.errorMessage = `Usuario y/o password incorrectos`;
      this.errorCode = `(ERRCODE ${error.code})`;
      loginForm.form.controls.user.setErrors({incorrect: true});
      loginForm.form.controls.password.setErrors({incorrect: true});
      return false;
    });
  }
}
