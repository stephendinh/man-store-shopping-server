import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { hashPassword } from 'src/utils/password-security';
import { Repository } from 'typeorm';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { UserAddressEntity } from './entity/user-address.entity';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserAddressEntity)
    private readonly userAddressRepo: Repository<UserAddressEntity>,
  ) {}

  async findOne(options: object): Promise<any> {
    return this.userRepo.findOne({ where: options });
  }

  async findOneUserAddress(options: object) {
    return this.userAddressRepo.findOne({ where: options });
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

  async addUserAddress(
    createUserAddressDto: CreateUserAddressDto,
    userId: number,
  ) {
    const {
      address_line,
      city,
      state,
      country,
      phone_number,
      zip_code,
      isDefault,
    } = createUserAddressDto;
    const user = await this.findOne({ id: userId });
    // check if user not exist
    if (!user) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        `User with id ${userId} is not found`,
      );
    }
    const address = await this.findOneUserAddress({ address_line });
    // check if the user is already exist
    if (
      address &&
      city.trim() === address.city &&
      country.trim() === address.country
    ) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `Your address is already exist`,
      );
    }
    const user_address = this.userAddressRepo.create({
      address_line,
      city,
      state,
      country,
      phone_number,
      zip_code,
      isDefault,
      user: user,
    });
    return this.userAddressRepo.save(user_address);
  }

  async getAllUsers(queryDto: any): Promise<any> {
    const { search, limit, page } = queryDto;
    const skip = page * (limit | 10);
    const [users, total] = await this.userRepo
      .createQueryBuilder('user')
      .where('user.first_name like :name', { name: `%${search}%` })
      .orWhere('user.last_name like :name', { name: `%${search}%` })
      .take(limit)
      .skip(skip)
      .orderBy('user.last_name', 'ASC')
      .leftJoinAndSelect('user.address', 'address')
      .getManyAndCount();
    return { data: users, total };
  }
}
