import { Photo } from 'src/photo/entities/photo.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAddressEntity } from './user-address.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @OneToMany(() => UserAddressEntity, (address) => address.user)
  address: UserAddressEntity[];

  @Column()
  email: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  deleted_at?: Date;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
