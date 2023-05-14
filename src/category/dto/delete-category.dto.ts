import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class DeleteCategory {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}
