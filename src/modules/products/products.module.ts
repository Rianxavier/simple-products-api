import { PrismaService } from '@database/prisma/prisma.service';
import { PrismaProductRepository } from '@database/prisma/repositories/PrismaProductRepository';
import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductRepository } from './repositories/ProductRepository';
import { CreateProductUseCase } from './useCases/createProductUseCase/createProductUseCase';
import { DeleteProductUseCase } from './useCases/deleteProductUseCase/deleteProductUseCase';
import { EditProductUseCase } from './useCases/editProductUseCase/editProductUseCase';
import { FindAllOrderedByNameUseCase } from './useCases/findAllOrderedByName/findAllOrderedByNameUseCase';
import { FindByIdUseCase } from './useCases/findByIdUseCase/findByIdUseCase';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    FindAllOrderedByNameUseCase,
    FindByIdUseCase,
    EditProductUseCase,
    DeleteProductUseCase,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductsModule {}
