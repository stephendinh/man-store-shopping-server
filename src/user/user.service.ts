import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { hashPassword } from 'src/utils/password-security';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findOne(options: object) {
    return this.userRepo.findOne({ where: options });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password, first_name, last_name } = createUserDto;
    const newUser = this.userRepo.create({
      email,
      password,
      first_name,
      last_name,
    });
    return this.userRepo.save(newUser);
  }

  async updatePassword(email: string, newPassword: string) {
    const user = await this.findOne({ email });
    if (!user) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        'User not found',
      );
    }
    const passwordHashed = await hashPassword(newPassword);
    const userUpdated = this.userRepo.create({
      ...user,
      password: passwordHashed,
    });
    return await this.userRepo.save(userUpdated);
  }
}
