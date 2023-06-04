import { VariationEntity } from 'src/variation/entity/variation.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
  // @ManyToMany(() => VariationEntity, (variation) => variation.category, {
  //   onDelete: 'NO ACTION',
  //   onUpdate: 'NO ACTION',
  // })
  variation?: VariationEntity[];
}
