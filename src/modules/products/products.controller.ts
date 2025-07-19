import { Body, Controller, Post } from '@nestjs/common';
import { ProductDTO } from './dtos/ProductDTO';
import { CreateProductUseCase } from './useCases/createProductUseCase/createProductUseCase';
import { ProductViewModel } from './viewModel/ProductViewModel';

@Controller('products')
export class ProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  async createProduct(@Body() body: ProductDTO) {
    const { name, price, sku } = body;

    const product = await this.createProductUseCase.execute({
      name,
      price,
      sku,
    });

    return ProductViewModel.toHttp(product);
  }
}
