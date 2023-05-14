import { CategoryEntity } from 'src/category/entity/category.enity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VariationOptionEntity } from './variation-option.entity';

@Entity('variation')
export class VariationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(
    () => VariationOptionEntity,
    (variationOption) => variationOption.variation,
  )
  productItems: VariationOptionEntity[];

  @Column({ unique: true })
  name: string;
}
