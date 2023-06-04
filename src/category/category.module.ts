import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entity/category.entity';
import { SubCategory } from './entity/sub-category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryVariationEntity } from './entity/category-variation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoryEntity,
      SubCategory,
      CategoryVariationEntity,
    ]),
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
