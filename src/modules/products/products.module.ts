import { PrismaService } from '@database/prisma/prisma.service';
import { PrismaProductRepository } from '@database/prisma/repositories/PrismaProductRepository';
import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductRepository } from './repositories/ProductRepository';
import { CreateProductUseCase } from './useCases/createProductUseCase/createProductUseCase';
import { FindAllOrderedByNameUseCase } from './useCases/findAllOrderedByName/findAllOrderedByNameUseCase';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    CreateProductUseCase,
    FindAllOrderedByNameUseCase,
    {
      provide: ProductRepository,
      useClass: PrismaProductRepository,
    },
  ],
})
export class ProductsModule {}
