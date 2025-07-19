import { ProductRepository } from '@modules/products/repositories/ProductRepository';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaProductRepository } from './prisma/repositories/PrismaProductRepository';

@Module({
  providers: [
    PrismaService,
    { provide: ProductRepository, useClass: PrismaProductRepository },
  ],
  exports: [ProductRepository],
})
export class DatabaseModule {}
