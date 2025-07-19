import { Product } from '@modules/products/entities/Product';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../../repositories/ProductRepository';

interface ICreateProductRequest {
  name: string;
  price: number;
  sku: string;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ name, price, sku }: ICreateProductRequest) {
    const existingProduct = await this.productRepository.findBySku(sku);

    if (existingProduct) {
      throw new BadRequestException('SKU already exists');
    }

    const product = new Product({
      name,
      price,
      sku,
    });

    await this.productRepository.create(product);

    return product;
  }
}
