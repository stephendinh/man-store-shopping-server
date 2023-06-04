import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class TestSocketDto {
  @ApiProperty()
  @IsNotEmpty()
  mEvent: string;

  @ApiPropertyOptional()
  @IsOptional()
  data: any;

  @ApiPropertyOptional()
  @IsOptional()
  room: string;
}
