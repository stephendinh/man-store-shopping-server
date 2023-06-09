import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { Repository } from 'typeorm';
import { CreateVariationOptionDto } from './dto/create-variation-option.dto';
import { CreateVariationDto } from './dto/create-variation.dto';
import { VariationOptionEntity } from './entity/variation-option.entity';
import { VariationEntity } from './entity/variation.entity';

/**
 * API: create category
 * @Params: name, [variationId_1, variationId_2 ]
 * Method: post
 */
/**
 * API: get Variation By Category
 * @Params: variation_id
 * Method: get
 * response: [
 *  {name: 'color', values: [variation_options_1, variation_options_2] }
 * ]
 */
/**create product
 * API:
 * @Params: name, categoryId
 * Method: post
 */
@Injectable()
export class VariationService {
  constructor(
    @InjectRepository(VariationEntity)
    private readonly variationRepo: Repository<VariationEntity>,
    @InjectRepository(VariationOptionEntity)
    private readonly variationOptionRepo: Repository<VariationOptionEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async findOneVariation(options: object): Promise<VariationEntity> {
    return this.variationRepo.findOne({ where: options });
  }
  async findOneVariationOption(
    options: object,
  ): Promise<VariationOptionEntity> {
    return this.variationOptionRepo.findOne({ where: options });
  }

  async createVariation(
    createVariation: CreateVariationDto,
  ): Promise<VariationEntity> {
    const { name } = createVariation;
    const variation = await this.findOneVariation({ name });
    if (variation) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `variation with name ${name} is exist!`,
      );
    }
    const new_variation = this.variationRepo.create({
      name,
    });
    return this.variationRepo.save(new_variation);
  }

  async createVariationOption(
    createVariationOption: CreateVariationOptionDto,
  ): Promise<VariationOptionEntity> {
    const { value, variation_id } = createVariationOption;
    const variation = await this.findOneVariation({ id: variation_id });
    if (!variation) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        `Variation with id ${variation_id} is not found`,
      );
    }
    const variation_option = await this.findOneVariationOption({ value });
    if (variation_option) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `Variation option with value ${value} is exist`,
      );
    }
    const new_Variation_option = this.variationOptionRepo.create({
      value,
      variation,
    });
    return this.variationOptionRepo.save(new_Variation_option);
  }
}
