import { Body, Controller, Post } from '@nestjs/common';
import { CreateVariationOptionDto } from './dto/create-variation-option.dto';
import { CreateVariationDto } from './dto/create-variation.dto';
import { VariationService } from './variation.service';

@Controller('api/variation')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @Post('/option')
  async createVariationOption(
    @Body() createVariationOptionDto: CreateVariationOptionDto,
  ): Promise<any> {
    return this.variationService.createVariationOption(
      createVariationOptionDto,
    );
  }

  @Post()
  async createVariation(
    @Body() createVariation: CreateVariationDto,
  ): Promise<any> {
    return this.variationService.createVariation(createVariation);
  }
}
