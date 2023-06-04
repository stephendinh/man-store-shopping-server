import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(15)
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(15)
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(17)
  @MinLength(8)
  password: string;
}
