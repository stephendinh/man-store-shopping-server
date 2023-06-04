import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateVariationDto {
  @IsNotEmpty()
  @MaxLength(15)
  name: string;
}
