import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OderProductEntity } from './entities/order-product.entity';
import { ProductItemModule } from 'src/product-item/product-item.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OderProductEntity]),
    ProductItemModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
