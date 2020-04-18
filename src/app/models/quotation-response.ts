import {Quotation} from './quotation';

export class QuotationResponse extends Quotation {
  personId: number;
  providerId: number;
  quotationId: number;
  categoryDescription: string;
  providerBusinessName: string;
}
