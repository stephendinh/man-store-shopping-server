import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), UserModule],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
