import { OderProductEntity } from 'src/order/entities/order-product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product-item')
export class ProductItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column()
  qty_in_stock: number;

  @Column()
  image_url: string;

  @Column()
  SKU: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  // @OneToMany(() => OderProductEntity, (orderProduct) => orderProduct.item)
  // orderProduct: OderProductEntity[];
}
