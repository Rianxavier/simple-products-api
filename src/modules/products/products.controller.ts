import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductDTO } from './dtos/ProductDTO';
import { CreateProductUseCase } from './useCases/createProductUseCase/createProductUseCase';
import { FindAllOrderedByNameUseCase } from './useCases/findAllOrderedByName/findAllOrderedByNameUseCase';
import { FindByIdUseCase } from './useCases/findByIdUseCase/findByIdUseCase';
import { ProductViewModel } from './viewModel/ProductViewModel';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllOrderedByNameUseCase: FindAllOrderedByNameUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
  ) {}

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

  @Get()
  async findAllOrderedByName() {
    const products = await this.findAllOrderedByNameUseCase.execute();

    return products.map((product) => ProductViewModel.toHttp(product));
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const product = await this.findByIdUseCase.execute(id);

    return ProductViewModel.toHttp(product);
  }
}
