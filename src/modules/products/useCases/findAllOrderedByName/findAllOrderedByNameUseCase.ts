import { ProductRepository } from '@modules/products/repositories/ProductRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllOrderedByNameUseCase {
  constructor(private readonly productRepository: ProductRepository) {}
  async execute() {
    return this.productRepository.findAllOrderedByName();
  }
}
