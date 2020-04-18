import {QuotationRequestDetail} from './quotation-request-detail';

export class  QuotationRequest {
  private _categoryId: number;
  private _personId: number;
  private _additionalInfo: string;
  private _requestQuotationId: number;
  private _categoryDescription: string;
  private _eRequestStatus: string;
  private _details: Array<QuotationRequestDetail>;

  constructor() {
    this._details = new Array<QuotationRequestDetail>();
  }

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(value: number) {
    this._categoryId = value;
  }

  get personId(): number {
    return this._personId;
  }

  set personId(value: number) {
    this._personId = value;
  }

  get additionalInfo(): string {
    return this._additionalInfo;
  }

  set additionalInfo(value: string) {
    this._additionalInfo = value;
  }

  get details(): QuotationRequestDetail[] {
    return this._details;
  }

  get requestQuotationId(): number {
    return this._requestQuotationId;
  }

  set requestQuotationId(value: number) {
    this._requestQuotationId = value;
  }

  get categoryDescription(): string {
    return this._categoryDescription;
  }

  set categoryDescription(value: string) {
    this._categoryDescription = value;
  }

  get eRequestStatus(): string {
    return this._eRequestStatus;
  }

  set eRequestStatus(value: string) {
    this._eRequestStatus = value;
  }

  set details(value: QuotationRequestDetail[]) {
    this._details = value;
  }

  public addDetail(value: QuotationRequestDetail) {
    this._details.push(value);
  }

  public assingObjectToDetail(value: any) {
    const objectList = Object.values(value);
    this._details = new Array<QuotationRequestDetail>();
    objectList.forEach((element) => {
      this.addDetail(Object.assign(new QuotationRequestDetail(), element));
    });
  }
}
