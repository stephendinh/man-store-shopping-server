import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity('sub_category')
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @Column({ unique: true })
  name: string;
}
