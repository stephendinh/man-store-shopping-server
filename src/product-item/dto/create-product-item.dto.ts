import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateProductItemDto {
  @IsNotEmpty()
  qty_in_stock: number;

  @IsNotEmpty()
  image_url: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  color: string;

  @IsNotEmpty()
  @IsString()
  SKU: string;
}
