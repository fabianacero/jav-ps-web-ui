export class Customer {
  private _firstName: string;
  private _lastName: string;
  private _documentType: number;
  private _documentNumber: number;
  private _email: string;
  private _password: string;
  private _confirmPassword: string;
  private _phone: number;
  private _user;

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get phone(): number {
    return this._phone;
  }

  set phone(value: number) {
    this._phone = value;
  }

  get confirmPassword(): string {
    return this._confirmPassword;
  }

  set confirmPassword(value: string) {
    this._confirmPassword = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get documentType(): number {
    return this._documentType;
  }

  set documentType(value: number) {
    this._documentType = value;
  }

  get documentNumber(): number {
    return this._documentNumber;
  }

  set documentNumber(value: number) {
    this._documentNumber = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
