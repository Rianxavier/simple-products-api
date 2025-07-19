import { Product } from '@modules/products/entities/Product';
import { NotFoundException } from '@nestjs/common';
import { PrismaProductMapper } from '../../../../database/prisma/mappers/PrismaProductMapper';
import { ProductRepositoryInMemory } from '../../repositories/ProductRepositoryInMemory';
import { DeleteProductUseCase } from './deleteProductUseCase';

let productRepositoryInMemory: ProductRepositoryInMemory;
let deleteProductUseCase: DeleteProductUseCase;

describe('Delete Product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    deleteProductUseCase = new DeleteProductUseCase(productRepositoryInMemory);
  });

  it('should delete a product successfully', async () => {
    const product = new Product({
      name: 'Test Product',
      price: 1000,
      sku: 'TEST-001',
    });

    productRepositoryInMemory.products.push(product);

    await deleteProductUseCase.execute(
      PrismaProductMapper.toPrismaWithAll(product).id!,
    );

    expect(productRepositoryInMemory.products).toHaveLength(0);
  });

  it('should throw NotFoundException if product does not exist', async () => {
    await expect(
      deleteProductUseCase.execute('non-existent-id'),
    ).rejects.toThrow(NotFoundException);
  });
});
