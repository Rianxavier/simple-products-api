import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDTO } from './dtos/ProductDTO';
import { CreateProductUseCase } from './useCases/createProductUseCase/createProductUseCase';
import { DeleteProductUseCase } from './useCases/deleteProductUseCase/deleteProductUseCase';
import { EditProductUseCase } from './useCases/editProductUseCase/editProductUseCase';
import { FindAllOrderedByNameUseCase } from './useCases/findAllOrderedByName/findAllOrderedByNameUseCase';
import { FindByIdUseCase } from './useCases/findByIdUseCase/findByIdUseCase';
import { ProductViewModel } from './viewModel/ProductViewModel';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllOrderedByNameUseCase: FindAllOrderedByNameUseCase,
    private readonly findByIdUseCase: FindByIdUseCase,
    private readonly editProductUseCase: EditProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
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

  @Put(':id')
  async save(@Param('id') id: string, @Body() body: ProductDTO) {
    const { name, price, sku } = body;

    const productSave = await this.editProductUseCase.execute({
      id,
      name,
      price,
      sku,
    });

    return ProductViewModel.toHttp(productSave);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteProductUseCase.execute(id);

    return { message: 'Product deleted successfully' };
  }
}
