import {Injectable} from '@angular/core';
import {Utilities} from 'src/app/utilities/utilities';
import {HttpRequestService} from '../http-request/http-request.service';
import {Session} from '../../models/session';
import {HttpMethod} from '../../enums/http-method.enum';
import {Observable} from 'rxjs';
import {AuthInfo} from '../../models/auth-info';
import {PersonResponse} from '../../models/person-response';
import {ProviderResponse} from '../../models/provider-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private session: Session;

  constructor(
    private httpRequest: HttpRequestService,
    private utilities: Utilities) {
  }

  public loginUser(loginForm): Observable<AuthInfo> {
    const url = '/user/login';
    const payload = {
      userCode: loginForm.value.user,
      password: btoa(loginForm.value.password)
    };
    return this.httpRequest.request(url, payload, HttpMethod.POST);
  }

  public getPersonInformation(userId): Observable<PersonResponse> {
    return this.httpRequest.request(`/user/${userId}`, {}, HttpMethod.GET);
  }

  public getProviderInformation(providerId): Observable<ProviderResponse[]> {
    return this.httpRequest.request(`/advisor/provider/${providerId}`, {}, HttpMethod.GET);
  }

  public isLogged() {
    return this.utilities.getFromSession('session') !== null;
  }
}
