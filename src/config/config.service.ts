import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity/product.entity';
import 'dotenv/config';
import { CategoryEntity } from 'src/category/entity/category.enity';
import { SubCategory } from 'src/category/entity/sub-category.entity';
import { VariationEntity } from 'src/variation/enity/variation.entity';
import { VariationOptionEntity } from 'src/variation/enity/variation-option.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserAddressEntity } from 'src/user/entity/user-address.entity';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('DATABASE_HOST'),
      port: parseInt(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USER'),
      password: this.getValue('DATABASE_PASSWORD'),
      database: this.getValue('DATABASE_NAME'),
      //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [
        ProductEntity,
        CategoryEntity,
        SubCategory,
        VariationOptionEntity,
        VariationEntity,
        UserEntity,
        UserAddressEntity,
      ],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      synchronize: true,
    };
  }
}
const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
]);

export { configService };
