import { BadRequestException } from '@nestjs/common';
import { ProductRepositoryInMemory } from '../../repositories/ProductRepositoryInMemory';
import { CreateProductUseCase } from './createProductUseCase';

let productRepositoryInMemory: ProductRepositoryInMemory;
let createProductUseCase: CreateProductUseCase;

describe('Create Product', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    createProductUseCase = new CreateProductUseCase(productRepositoryInMemory);
  });

  it('should create a product successfully', async () => {
    expect(productRepositoryInMemory.products).toEqual([]);

    const product = await createProductUseCase.execute({
      name: 'Teste',
      price: 3999,
      sku: 'TST-123',
    });

    expect(productRepositoryInMemory.products).toEqual([product]);
    expect(product).toHaveProperty('id');
    expect(product.name).toBe('Teste');
    expect(product.price).toBe(3999);
    expect(product.sku).toBe('TST-123');
  });

  it('should not allow creating a product with duplicate sku', async () => {
    const product = {
      name: 'Teste',
      price: 3999,
      sku: 'TST-123',
    };

    await createProductUseCase.execute(product);

    await expect(createProductUseCase.execute(product)).rejects.toThrow(
      BadRequestException,
    );
  });
});
