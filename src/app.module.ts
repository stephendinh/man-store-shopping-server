import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { VariationModule } from './variation/variation.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './mailer/mailer.module';
import { SocketModule } from './socket/socket.module';
import { ProductItemModule } from './product-item/product-item.module';
import { OrderModule } from './order/order.module';
import { RedisModule } from './redis/redis.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ProductModule,
    CategoryModule,
    VariationModule,
    UserModule,
    AuthModule,
    MailerModule,
    SocketModule,
    ProductItemModule,
    OrderModule,
    RedisModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
