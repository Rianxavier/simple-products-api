import { DatabaseModule } from '@database/database.module';
import { ProductsModule } from '@modules/products/products.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
