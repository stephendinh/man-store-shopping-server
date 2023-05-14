import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class CreateSubCategoryDto extends CreateCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  category_id: number;
}
