import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpMethod} from '../../enums/http-method.enum';
import {Profiles} from '../../enums/profiles.enum';
import {HttpRequestService} from '../http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpRequest: HttpRequestService) {
  }

  public customerRegistry(registerForm): Observable<any> {
    const url = '/user';
    const firstName = registerForm.value.firstName;
    const lastName = registerForm.value.lastName;
    const payload = {
      identificationType: registerForm.value.documentType,
      providerId: 0,
      firstName,
      lastName,
      identificationNumber: registerForm.value.documentNumber,
      email: registerForm.value.email,
      phoneNumber: registerForm.value.phone,
      userCode: registerForm.value.user,
      password: btoa(registerForm.value.password),
      profile: Profiles.CLIENT

    };

    return this.httpRequest.request(url, payload, HttpMethod.POST);
  }
}
