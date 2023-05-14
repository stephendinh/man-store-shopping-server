import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';

export class CreateVariationOptionDto {
  @IsNotEmpty()
  @MaxLength(15)
  value: string;

  @IsNotEmpty()
  @IsPositive()
  variation_id: number;
}
