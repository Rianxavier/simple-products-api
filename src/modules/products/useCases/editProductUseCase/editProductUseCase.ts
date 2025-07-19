import { ProductRepository } from '@modules/products/repositories/ProductRepository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

interface IEditProductRequest {
  name: string;
  price: number;
  sku: string;
  id: string;
}

@Injectable()
export class EditProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute({ id, name, price, sku }: IEditProductRequest) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new NotFoundException();
    }

    const existingProduct = await this.productRepository.findBySku(sku);

    if (existingProduct && existingProduct.id !== id) {
      throw new BadRequestException('SKU already exists');
    }

    product.name = name;
    product.price = price;
    product.sku = sku;

    await this.productRepository.save(product);

    return product;
  }
}
