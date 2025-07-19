import { Product } from '../entities/Product';
export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findBySku(sku: string): Promise<Product | null>;
  //   abstract findById(id: string): Promise<Product | null>;
  //   abstract findAll(): Promise<Product[] | null>;
  //   abstract delete(id: string): Promise<void>;
  //   abstract save(product: ProductDTO): Promise<Product | null>;
}
