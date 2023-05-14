import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  subCategory_id: number;
}
