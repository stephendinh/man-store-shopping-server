import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VariationEntity } from './variation.entity';

@Entity('variation_option')
export class VariationOptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VariationEntity, (variation) => variation.id)
  @JoinColumn({ name: 'variation_id' })
  variation: VariationEntity;

  @Column({ unique: true })
  value: string;
}
