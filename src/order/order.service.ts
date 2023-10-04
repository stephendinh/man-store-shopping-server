import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductItemService } from 'src/product-item/product-item.service';
import { BaseHttpException } from 'src/shared/base-http-exception';
import { ErrorStatusEnums } from 'src/types/errors/errors.enum';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OderProductEntity } from './entities/order-product.entity';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(OderProductEntity)
    private readonly orderItemDto: Repository<OderProductEntity>,
    private readonly productItemService: ProductItemService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { payment_method, total_price, shipping_address, listItem } =
      createOrderDto;
    const convertListItemToNumber = listItem.map((item) => item.product_id);
    const listItemExist = await this.productItemService.findListId(
      convertListItemToNumber,
    );
    if (listItemExist.length !== listItem.length) {
      throw BaseHttpException.generateError(
        ErrorStatusEnums.BAD_REQUEST,
        `Your list item id is not correct`,
      );
    }
    // const orderCreated = this.orderRepo.create({
    //   shipping_address,
    //   total_price: this.sumPriceProduct(listItem),
    //   payment_method,
    //   orderProduct: listItemExist.map((item1) => {
    //     return {
    //       item: item1,
    //       quantity: 1,
    //       price: 2,
    //     };
    //   }),
    // })
    const match2Arrays = listItem.map((x) => {
      const item = listItemExist.find((item) => item.id === x.product_id);
      if (item) {
        return {
          item,
          ...x,
        };
      }
    });

    const orderItem = this.orderItemDto.create(match2Arrays);
    await this.orderItemDto.save(orderItem);
    const orderCreated = this.orderRepo.create({
      shipping_address,
      total_price,
      payment_method,
      orderProduct: orderItem,
    });
    return this.orderRepo.save(orderCreated);
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(object: object) {
    return this.orderRepo.findOne({ where: object });
  }
  findOneOrderItem(object: object) {
    return this.orderItemDto.findOne({ where: object });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  private sumPriceProduct(listItem: any) {
    const sumWithInitial = listItem.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.quantity * currentValue.price,
      0,
    );
    return sumWithInitial;
  }
}
