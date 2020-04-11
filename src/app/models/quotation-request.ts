import {QuotationRequestDetail} from './quotation-request-detail';

export class QuotationRequest {
  private _categoryId: number;
  private _personId: number;
  private _additionalInfo: string;
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

  set details(value: QuotationRequestDetail[]) {
    this._details = value;
  }

  public addDetail(value: QuotationRequestDetail) {
    this._details.push(value);
  }
}
