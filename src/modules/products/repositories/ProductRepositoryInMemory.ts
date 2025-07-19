import { Product } from '../entities/Product';
import { ProductRepository } from './ProductRepository';

export class ProductRepositoryInMemory implements ProductRepository {
  public products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = this.products.find((product) => product.sku === sku);

    if (!product) {
      return null;
    }

    return product;
  }
}
