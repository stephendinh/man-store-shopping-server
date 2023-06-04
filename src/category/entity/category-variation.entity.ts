import { CategoryEntity } from 'src/category/entity/category.entity';
import { VariationEntity } from 'src/variation/entity/variation.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('variation_category')
export class CategoryVariationEntity {
  @PrimaryColumn({ name: 'category_id' })
  categoryId: number;

  @PrimaryColumn({ name: 'variation_id' })
  variationId: number;

  @ManyToOne(() => CategoryEntity, (category) => category.variation, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: CategoryEntity[];

  @ManyToOne(() => VariationEntity, (variation) => variation.category, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'variation_id', referencedColumnName: 'id' }])
  variation: VariationEntity[];
}
