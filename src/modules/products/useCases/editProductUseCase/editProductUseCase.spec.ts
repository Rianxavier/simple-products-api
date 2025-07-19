import { Product } from '@modules/products/entities/Product';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaProductMapper } from '../../../../database/prisma/mappers/PrismaProductMapper';
import { ProductRepositoryInMemory } from '../../repositories/ProductRepositoryInMemory';
import { EditProductUseCase } from './editProductUseCase';

let productRepositoryInMemory: ProductRepositoryInMemory;
let editProductUseCase: EditProductUseCase;

describe('Find product by id', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    editProductUseCase = new EditProductUseCase(productRepositoryInMemory);
  });

  it('should be able to edit product', async () => {
    expect(productRepositoryInMemory.products).toEqual([]);

    const productA = new Product({
      name: 'Banana',
      price: 500,
      sku: 'BNN-123',
    });

    productRepositoryInMemory.products = [productA];

    const nameChanged = 'Name Changed';
    const priceChanged = 900;
    const skuChanged = 'SKU Changed';

    await editProductUseCase.execute({
      id: productA.id,
      name: nameChanged,
      price: priceChanged,
      sku: skuChanged,
    });

    expect(productRepositoryInMemory.products[0].name).toEqual(nameChanged);
    expect(productRepositoryInMemory.products[0].price).toEqual(priceChanged);
    expect(productRepositoryInMemory.products[0].sku).toEqual(skuChanged);
  });

  it('should return not found if product is not exist', async () => {
    await expect(
      editProductUseCase.execute({
        id: 'non-existent-id',
        name: 'nameChanged',
        price: 344,
        sku: 'skuChanged',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return BadRequestException if SKU is already in use by another product', async () => {
    const productA = new Product({
      name: 'Produto A',
      price: 500,
      sku: 'BNN-123',
    });

    const productB = new Product({
      name: 'Produto B',
      price: 500,
      sku: 'BNB-442',
    });

    productRepositoryInMemory.products = [productA, productB];

    await expect(
      editProductUseCase.execute({
        id: PrismaProductMapper.toPrismaWithAll(productA).id!,
        name: 'Teste',
        price: 877,
        sku: productB.sku,
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
