import { Product } from '@modules/products/entities/Product';
import { Prisma, Product as ProductPrisma } from '@prisma/client';

export class PrismaProductMapper {
  static toPrisma(product: Product): Prisma.ProductCreateInput {
    return {
      name: product.name,
      price: product.price,
      sku: product.sku,
    };
  }

  static toDomain(productRaw: ProductPrisma): Product {
    return new Product(
      {
        name: productRaw.name,
        price: productRaw.price,
        sku: productRaw.sku,
        createdAt: productRaw.createdAt,
      },
      productRaw.id,
    );
  }
}
