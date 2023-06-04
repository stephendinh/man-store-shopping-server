import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductEntity } from 'src/product/entity/product.entity';
import 'dotenv/config';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { SubCategory } from 'src/category/entity/sub-category.entity';
import { VariationEntity } from 'src/variation/entity/variation.entity';
import { VariationOptionEntity } from 'src/variation/entity/variation-option.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { UserAddressEntity } from 'src/user/entity/user-address.entity';
import { CategoryVariationEntity } from 'src/category/entity/category-variation.entity';
import { DataSource } from 'typeorm';

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
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      // entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      // Run migrations automatically,
      // you can disable this if you prefer running migration manually.
      migrationsRun: false,
      logging: true,
      logger: 'file',
      // allow both start:prod and start:dev to use migrations
      // __dirname is either dist or src folder, meaning either
      // the compiled js in prod or the ts in dev
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    };
  }
}
const AppDataSource1 = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'men_shopping_store',
  synchronize: false,
  logging: false,
  entities: [
    ProductEntity,
    CategoryEntity,
    SubCategory,
    VariationOptionEntity,
    VariationEntity,
    UserEntity,
    UserAddressEntity,
    CategoryVariationEntity,
  ],
  migrationsRun: true,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});
const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
]);

export { configService, AppDataSource1 };
