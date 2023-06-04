import { CategoryEntity } from 'src/category/entity/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VariationOptionEntity } from './variation-option.entity';

@Entity('variation')
export class VariationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => CategoryEntity)
  @JoinTable({
    name: 'variation_category',
    joinColumn: {
      name: 'variation_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  category?: CategoryEntity[];

  @OneToMany(
    () => VariationOptionEntity,
    (variationOption) => variationOption.variation,
  )
  productItems: VariationOptionEntity[];

  @Column({ unique: true })
  name: string;
}
