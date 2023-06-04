import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { Not, Repository } from 'typeorm';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { ProductItemEntity } from './entities/product-item.entity';
import { In } from 'typeorm';

@Injectable()
export class ProductItemService {
  constructor(
    @InjectRepository(ProductItemEntity)
    private readonly productItemRepo: Repository<ProductItemEntity>,
  ) {}
  async create(
    createProductItemDto: CreateProductItemDto,
  ): Promise<ProductItemEntity> {
    const { color, SKU, qty_in_stock, image_url } = createProductItemDto;
    const productItem = await this.findOne({ color });
    if (productItem) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `This item is exist!`,
      );
    }
    const createdItem = this.productItemRepo.create({
      color,
      SKU,
      qty_in_stock,
      image_url,
    });
    return this.productItemRepo.save(createdItem);
  }

  findAll() {
    return `This action returns all productItem`;
  }

  async findListId(ids: number[]) {
    console.log('ids', ids);
    return this.productItemRepo.find({
      where: { id: In([ids]) },
    });
  }
  findMany(options: any) {
    return this.productItemRepo.find({ where: options });
  }

  async findOne(object: object) {
    return this.productItemRepo.findOne({
      where: object,
    });
  }

  update(id: number, updateProductItemDto: UpdateProductItemDto) {
    return `This action updates a #${id} productItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productItem`;
  }
}
