import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';
import { CategoryEntity } from './entity/category.enity';
import { SubCategory } from './entity/sub-category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepo: Repository<SubCategory>,
  ) {}
  async findOneCategory(options: object): Promise<CategoryEntity> {
    const rs = await this.categoryRepo.findOne({ where: options });
    return rs;
  }

  async findOneSubCategory(options: object): Promise<CategoryEntity> {
    const rs = await this.subCategoryRepo.findOne({ where: options });
    return rs;
  }

  async createCategory(createCategory: CreateCategoryDto): Promise<any> {
    const { name } = createCategory;
    const category = await this.findOneCategory({ name });
    if (category) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `category with name: ${name} is exist`,
      );
    }
    const newCategory = this.categoryRepo.create({ name });
    return await this.categoryRepo.save(newCategory);
  }

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
