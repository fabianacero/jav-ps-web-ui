import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Utilities} from '../../utilities/utilities';
import {LoginService} from '../../provider/login/login.service';
import {Routes} from '../../enums/routes.enum';
import {Session} from '../../models/session';
import {PersonResponse} from '../../models/person-response';

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
      this.getPersonInfo(session);
    }, (error) => {
      this.errorMessage = `Usuario y/o password incorrectos`;
      this.errorCode = `(ERRCODE ${error.code})`;
      loginForm.form.controls.user.setErrors({incorrect: true});
      loginForm.form.controls.password.setErrors({incorrect: true});
      return false;
    });
  }

  public getPersonInfo(session: Session) {
    this.login.getPersonInformation(session.userId).subscribe((personResponse: PersonResponse) => {
      session.person = personResponse.person;
      this.utilities.saveOnSession('session', session);
      if (session.providerId > 0) {
        this.getProviderInfo(session.providerId);
      } else {
        this.router.navigate([Routes.APP]);
      }

    });
  }

  public getProviderInfo(providerId) {
    this.login.getProviderInformation(providerId).subscribe((providers) => {
      const provider = providers[0];
      const session: Session = this.utilities.getFromSessionObject('session', new Session());
      session.provider = provider;
      this.utilities.saveOnSession('session', session);
      this.router.navigate([Routes.APP]);
    });
  }
}
