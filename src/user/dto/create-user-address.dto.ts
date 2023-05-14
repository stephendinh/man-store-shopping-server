import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsPhoneNumber } from 'src/decorators/phone.decorator';
import { IsDefaultType } from '../interface/is-default.interface';

export class CreateUserAddressDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  address_line: string;

  @IsNotEmpty()
  city: string;

  @IsOptional()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @IsEnum(IsDefaultType)
  @IsNotEmpty()
  isDefault: number;

  @IsNotEmpty()
  @MaxLength(10)
  @MinLength(4)
  zip_code: number;
}
