import {Injectable} from '@angular/core';
import {Utilities} from 'src/app/utilities/utilities';
import {HttpRequestService} from '../http-request/http-request.service';
import {Session} from '../../models/session';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private session: Session;

  constructor(
    private httpRequest: HttpRequestService,
    private utilities: Utilities) {
  }

  public loginUser(loginForm, callback): any {

  }

  public isLogged() {
    return this.utilities.getFromSession('session') !== null;
  }
}
