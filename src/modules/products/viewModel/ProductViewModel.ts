import { Product } from '../entities/Product';

export class ProductViewModel {
  static toHttp({ createdAt, name, price, sku, id }: Product) {
    return {
      id,
      name,
      price,
      sku,
      createdAt,
    };
  }
}
