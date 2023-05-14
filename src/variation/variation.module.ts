import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { CategoryEntity } from 'src/category/entity/category.enity';
import { VariationOptionEntity } from './enity/variation-option.entity';
import { VariationEntity } from './enity/variation.entity';
import { VariationService } from './variation.service';
import { VariationController } from './variation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VariationEntity,
      VariationOptionEntity,
      CategoryEntity,
    ]),
    CategoryModule,
  ],
  providers: [VariationService],
  controllers: [VariationController],
})
export class VariationModule {}
