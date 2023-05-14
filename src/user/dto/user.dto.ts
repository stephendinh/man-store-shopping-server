import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Expose()
  avatar: string;

  deleted_at: Date;

  @Expose()
  created_at: string;

  @Expose()
  updated_at: string;
}
