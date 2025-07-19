import { ProductRepository } from '@modules/products/repositories/ProductRepository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException();
    }

    await this.productRepository.delete(id);
  }
}
