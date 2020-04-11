export class QuotationRequestDetail {
  private _productId: number;
  private _productDescription: string;
  private _quantity: number;
  private _additionalInformation: string;

  constructor(quotationDetail?) {
    if (quotationDetail) {
      this._productId = quotationDetail.productId;
      this._productDescription = quotationDetail.productDescription;
      this._quantity = quotationDetail.quantity;
      this._additionalInformation = quotationDetail.additionalInformation;
    }
  }

  get productId(): number {
    return this._productId;
  }

  set productId(value: number) {
    this._productId = value;
  }

  get productDescription(): string {
    return this._productDescription;
  }

  set productDescription(value: string) {
    this._productDescription = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get additionalInformation(): string {
    return this._additionalInformation;
  }

  set additionalInformation(value: string) {
    this._additionalInformation = value;
  }
}
