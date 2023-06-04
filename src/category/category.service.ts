import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { AppDataSource1, configService } from 'src/config/config.service';
import { AppDataSource } from 'src/data-source';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { UserEntity } from 'src/user/entity/user.entity';
import {
  EntityManager,
  getConnection,
  getManager,
  Repository,
  Connection,
} from 'typeorm';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { CategoryVariationEntity } from './entity/category-variation.entity';
import { CategoryEntity } from './entity/category.entity';
import { SubCategory } from './entity/sub-category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepo: Repository<SubCategory>,
    @InjectRepository(CategoryVariationEntity)
    private readonly categoryVariationRepo: Repository<CategoryVariationEntity>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private connection: Connection,
  ) {}
  async findOneCategory(options: object): Promise<CategoryEntity> {
    const rs = await this.categoryRepo.findOne({ where: options });
    return rs;
  }
  async findOneSubCategory(options: object): Promise<CategoryEntity> {
    const rs = await this.subCategoryRepo.findOne({ where: options });
    return rs;
  }
  async createCategoryVariation(category_id: number, variations: any) {
    const categoryVariations = variations.map((variation_id: number) => {
      return {
        categoryId: category_id,
        variationId: variation_id,
      };
    });
    const categoryVariationsEntity =
      this.categoryVariationRepo.create(categoryVariations);

    if (categoryVariations.length) {
      // const rs = await this.categoryVariationRepo
      //   .createQueryBuilder()
      //   .insert()
      //   .into(CategoryVariationEntity)
      //   .values([{ categoryId: category_id, variationId: 3 }])
      //   .execute();
      for (let i = 0; i < categoryVariations.length; i++) {
        await this.categoryVariationRepo.save(categoryVariationsEntity[i]);
      }
    }
    // console.log('categoryVariations', categoryVariations);
    // const rs = await this.categoryVariationRepo
    //   .createQueryBuilder()
    //   .insert()
    //   .values(categoryVariations)
    //   .execute();
    // const rs = await this.categoryVariationRepo.save({
    //   categoryId: 10,
    //   variationId: 1,
    // });
    // return rs;
  }

  async createCategory(createCategory: any): Promise<any> {
    const { name, listVariationId } = createCategory;
    const categoryInstance = this.categoryRepo.create({
      name,
    });
    const category = await this.findOneCategory({ name });
    if (category) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `category with name: ${name} is exist`,
      );
    }
    const listVariation = await this.categoryVariationRepo.find();
    console.log('listVariation', listVariation);
    // const queryRunner = AppDataSource1.createQueryRunner();
    // await queryRunner.connect();
    // // lets now open a new transaction:
    // await queryRunner.startTransaction();
    // try {
    //   // execute some operations on this transaction:
    //   const savedCategory = await queryRunner.manager.save(categoryInstance);
    //   // commit transaction now:
    //   console.log('savedCategory', savedCategory);
    //   const categoryVariation = await this.createCategoryVariation(
    //     savedCategory.id,
    //     listVariationId,
    //   );
    //   console.log('categoryVariation', categoryVariation);
    //   await queryRunner.commitTransaction();
    // } catch (err) {
    //   console.log('err', err);
    //   // since we have errors let's rollback changes we made
    //   await queryRunner.rollbackTransaction();
    //   throw BaseHttpException.generateError();
    // } finally {
    //   // you need to release query runner which is manually created:
    //   await queryRunner.release();
    // }
  }

  // async createCategory(createCategory: any): Promise<any> {
  //   const { name, listVariationId } = createCategory;
  //     const category = await this.findOneCategory({ name });
  //     if (category) {
  //       throw BaseHttpException.generateError(
  //         ErrorStatusEnums.BAD_REQUEST,
  //         `category with name: ${name} is exist`,
  //       );
  //     }
  //     const newCategory = this.categoryRepo.create({ name });
  //   await this.entityManager.transaction(async (transactionalManager: EntityManager) => {
  //     const rs = await transactionalManager.save(newCategory)
  //     await transactionalManager.save(users)
  //   }
  // }

  async deleteCategory(id: number) {
    const category = await this.findOneCategory({ id });
    if (!category) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        `category with id: ${id} is not exist`,
      );
    }
    await this.categoryRepo.remove(category);
    return {
      success: true,
      message: `You have just deleted category: ${category.name}`,
    };
  }

  async createSubCategory(
    createSubCategory: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    const { name, category_id } = createSubCategory;
    const category = await this.findOneCategory({ id: category_id });
    if (!category) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        `category with id: ${category_id} is not exist`,
      );
    }
    const subCategory = await this.findOneSubCategory({ name });
    if (subCategory) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `sub-category with name: ${subCategory.name} is exist`,
      );
    }
    const newSubCategory = this.subCategoryRepo.create({
      name,
      category,
    });
    return await this.subCategoryRepo.save(newSubCategory);
  }

  async findAll() {
    const name = '';
    const [category, total] = await this.categoryRepo
      .createQueryBuilder('category')
      .where('category.name like :name', { name: `%${name}%` })
      // .select(['category.id', 'category.name'])
      .skip(5)
      .take(10)
      .getManyAndCount();

    return {
      category,
      total,
    };
  }
}
