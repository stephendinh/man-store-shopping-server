import { IsNumber, Min } from 'class-validator';
import { ProductItemEntity } from 'src/product-item/entities/product-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order-product')
export class OderProductEntity {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => ProductItemEntity)
  @JoinColumn({ name: 'productItem_id' })
  item: ProductItemEntity;

  @ManyToOne(() => OrderEntity)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column()
  @IsNumber()
  @Min(1)
  price: number;

  @Column()
  @IsNumber()
  @Min(1)
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updated_at: Date;
}
