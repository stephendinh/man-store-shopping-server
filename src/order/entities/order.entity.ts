import { Min } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderStatus } from '../types/order-status.enums';
import { PaidStatus } from '../types/pay-status.enums';
import { PaymentMethod } from '../types/payment-method.enums';
import { OderProductEntity } from './order-product.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @UpdateDateColumn()
  created_at: Date;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.Cash,
  })
  payment_method: string;

  @Column()
  @Min(1)
  total_price: number;

  @Column()
  shipping_address: string;

  @Column({
    type: 'enum',
    enum: PaidStatus,
    default: PaidStatus.FALSE,
  })
  isPaid: boolean;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  order_status: string;

  @OneToMany(() => OderProductEntity, (orderProduct) => orderProduct.order, {
    eager: true,
  })
  orderProduct: OderProductEntity[];
}
