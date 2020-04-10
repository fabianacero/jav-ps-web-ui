import {ProductServiceDetail} from './product-service-detail';

export interface ProductServiceResponse {
  categoryId: number;
  categoryDescription: string;
  productsServices: ProductServiceDetail;
}
