import { Product } from '../entities/Product';
export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findBySku(sku: string): Promise<Product | null>;
  abstract findAllOrderedByName(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | null>;
  abstract save(product: Product): Promise<Product | null>;
  abstract delete(id: string): Promise<void>;
}
