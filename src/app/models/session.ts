import {AuthInfo} from './auth-info';

export class Session implements AuthInfo {
  public customerInfo: {};
  public firstName: string;
  public lastName: string;
  public profile: string;
  public userCode: string;
  public userId: number;

  constructor(customerInfo: {}) {
    this.customerInfo = customerInfo;
  }
}
