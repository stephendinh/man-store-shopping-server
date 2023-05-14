import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';

export class CreateVariationDto {
  @IsNotEmpty()
  @MaxLength(15)
  name: string;

  @IsNotEmpty()
  @IsPositive()
  category_id: number;
}
