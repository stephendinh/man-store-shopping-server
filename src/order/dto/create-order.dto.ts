import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { PaymentMethod } from '../types/payment-method.enums';
export class OrderItemDto {
  @IsNotEmpty()
  product_id: number;

  @IsNotEmpty()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @Min(1)
  price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @Min(1)
  total_price: number;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  payment_method: string;

  @IsNotEmpty()
  shipping_address: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  listItem: OrderItemDto[];
}
