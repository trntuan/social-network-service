import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { PostImage } from './entities/post_image.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, PostImage, User]),
    ConfigModule,
    FileUploadModule,
  ],
  controllers: [PostController],
  providers: [PostService, FileUploadService, MinioClientService],
})
export class PostModule {}
