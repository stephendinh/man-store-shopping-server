import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findOne(options: object): Promise<ProductEntity> {
    return this.productRepo.findOne({ where: options });
  }

  async createProduct(
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ) {
    const { name, description, subCategory_id } = createProductDto;
    const productExist = await this.findOne({ name });
    const subCategory = await this.categoryService.findOneSubCategory({
      id: subCategory_id,
    });
    if (!subCategory) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        `sub-category with id: ${subCategory_id} is not exist`,
      );
    }
    if (productExist) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `Product with name ${name} is already exist!`,
      );
    }
    const image = await this.cloudinaryService.uploadFile(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    const newProduct = this.productRepo.create({
      name,
      description,
      subCategory,
      product_image: image.secure_url,
    });
    return this.productRepo.save(newProduct);
  }

  async uploadImage(file: Express.Multer.File) {
    const image = await this.cloudinaryService.uploadFile(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    return image;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const { name, subCategory_id, description } = updateProductDto;
    const product = await this.findOne({ id });
    if (!product) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        `Product with id: ${id} is not found`,
      );
    }
    const subCategory = await this.categoryService.findOneSubCategory({
      id: subCategory_id,
    });
    if (!subCategory) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.NOT_FOUND,
        `sub-category with id: ${subCategory_id} is not exist`,
      );
    }
    const updateProduct = Object.assign(product, {
      name: name || product.name,
      subCategory: subCategory || product.subCategory,
      description: description || product.description,
    });
    return this.productRepo.save(updateProduct);
  }
}
