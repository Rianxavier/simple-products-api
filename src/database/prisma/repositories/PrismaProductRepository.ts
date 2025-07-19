import { Product } from '@modules/products/entities/Product';
import { ProductRepository } from '@modules/products/repositories/ProductRepository';
import { Injectable } from '@nestjs/common';
import { PrismaProductMapper } from '../mappers/PrismaProductMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    const productRaw = PrismaProductMapper.toPrisma(product);

    const createdProduct = await this.prisma.product.create({
      data: productRaw,
    });

    return PrismaProductMapper.toDomain(createdProduct);
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { sku } });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }

  async findAllOrderedByName(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: { name: 'asc' },
    });

    return products.map((product) => PrismaProductMapper.toDomain(product));
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      return null;
    }

    return PrismaProductMapper.toDomain(product);
  }

  async save(product: Product): Promise<Product | null> {
    const produtcRaw = PrismaProductMapper.toPrismaWithAll(product);

    const productSave = await this.prisma.product.update({
      data: produtcRaw,
      where: { id: produtcRaw.id },
    });

    return PrismaProductMapper.toDomain(productSave);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
