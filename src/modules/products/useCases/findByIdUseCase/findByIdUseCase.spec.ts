import { Product } from '@modules/products/entities/Product';
import { NotFoundException } from '@nestjs/common';
import { ProductRepositoryInMemory } from '../../repositories/ProductRepositoryInMemory';
import { FindByIdUseCase } from './findByIdUseCase';

let productRepositoryInMemory: ProductRepositoryInMemory;
let findByIdUseCase: FindByIdUseCase;

describe('Find product by id', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    findByIdUseCase = new FindByIdUseCase(productRepositoryInMemory);
  });

  it('should return product when found by id', async () => {
    expect(productRepositoryInMemory.products).toEqual([]);

    const productA = new Product({
      name: 'Banana',
      price: 500,
      sku: 'BNN-123',
    });

    const productB = new Product({
      name: 'Amora',
      price: 600,
      sku: 'AMR-123',
    });

    const productC = new Product({
      name: 'Maçã',
      price: 700,
      sku: 'MAC-123',
    });

    productRepositoryInMemory.products.push(productA, productB, productC);

    const productAFound = await findByIdUseCase.execute(productA.id);

    expect(productAFound).toEqual(productA);
  });

  it('should return not found if product is not exist', async () => {
    await expect(findByIdUseCase.execute('non-existent-id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
