import { Product } from '@modules/products/entities/Product';
import { ProductRepositoryInMemory } from '../../repositories/ProductRepositoryInMemory';
import { FindAllOrderedByNameUseCase } from './findAllOrderedByNameUseCase';

let productRepositoryInMemory: ProductRepositoryInMemory;
let findAllOrderedByNameUseCase: FindAllOrderedByNameUseCase;

describe('Fin all products ordered by name', () => {
  beforeEach(() => {
    productRepositoryInMemory = new ProductRepositoryInMemory();
    findAllOrderedByNameUseCase = new FindAllOrderedByNameUseCase(
      productRepositoryInMemory,
    );
  });

  it('should return all products ordered by name ascending', async () => {
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

    const result = await findAllOrderedByNameUseCase.execute();

    expect(result).toEqual([productB, productA, productC]);
  });
});
