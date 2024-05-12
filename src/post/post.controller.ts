import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @UseGuards(AuthGuard)
  // @Post('single')
  // @UseInterceptors(FileInterceptor('image'))
  // register(
  //   @Req() req: any,
  //   @UploadedFile() file: BufferedFile,
  //   @Body() createUserDto: CreatePostDto,
  // ) {
  //   console.log('[id]121212:', req['user_data'].id);
  //   console.log('[createUserDto:', createUserDto.content);
  //   console.log('[file:', file);

  //   return this.postService.createPost(
  //     createUserDto,
  //     req['user_data'].id,
  //     file,
  //   );
  // }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
    ]),
  )
  register(
    @Req() req: any,
    @UploadedFiles() files: BufferedFile,
    @Body() createUserDto: CreatePostDto,
  ) {
    console.log('[id]121212:', req['user_data'].id);
    console.log('[createUserDto:', createUserDto.content);
    console.log('[file:', files);

    return this.postService.createPost(
      createUserDto,
      req['user_data'].id,
      files,
    );
  }
}
