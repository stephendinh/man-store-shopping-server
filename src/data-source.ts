import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { CategoryEntity } from './category/entity/category.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'men_shopping_store',
  synchronize: false,
  logging: false,

  entities: ['dist/**/*.entity.{js,ts}'],
  migrationsRun: true,
  logger: 'file',

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});
