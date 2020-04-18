import {QuotationRequestDetail} from './quotation-request-detail';

export class Quotation {
  providerId: number;
  requestId: number;
  amountTotal: number;
  details: QuotationRequestDetail[];
}
