import { SubCategory } from 'src/category/entity/sub-category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
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
}
