import { SubCategory } from 'src/category/entity/sub-category.entity';
import { ProductItemEntity } from 'src/product-item/entities/product-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
@Index(['name'])
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => SubCategory, (subCategory) => subCategory.id)
  @JoinColumn({ name: 'subcategory_id' })
  subCategory: SubCategory;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  product_image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  test: string;
}
