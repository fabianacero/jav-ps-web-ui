import {AuthInfo} from './auth-info';
import {Person} from './person';
import {ProviderResponse} from './provider-response';

export class Session implements AuthInfo {
  public person: Person;
  public providerId: number;
  public firstName: string;
  public lastName: string;
  public profile: string;
  public userCode: string;
  public userId: number;
  public eUserStatus?: string;
  public provider?: ProviderResponse;
}
