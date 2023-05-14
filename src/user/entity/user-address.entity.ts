import { Transform } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from './user.entity';

@Entity('user_address')
export class UserAddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  @Transform(({ value }) => ({ id: value.id, name: value.email }))
  user: UserDto;

  @Column({ unique: true })
  address_line: string;

  @Column()
  city: string;

  @Column({
    nullable: true,
  })
  state: string;

  @Column()
  country: string;

  @Column()
  phone_number: string;

  @Column()
  zip_code: number;

  @Column({ default: 0 })
  isDefault: number;

  @Column({ nullable: true })
  deleted_at: Date;
}
