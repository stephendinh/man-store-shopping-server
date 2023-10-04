import { IsNumber, Min } from 'class-validator';
import { ProductItemEntity } from 'src/product-item/entities/product-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order-product')
export class OderProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductItemEntity, (productItem) => productItem.id, {
    eager: true,
  })
  @JoinColumn({ name: 'product_id' })
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
