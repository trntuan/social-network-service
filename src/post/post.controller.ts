import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { BufferedFile } from 'src/minio-client/file.model';
import { AuthUserGuard } from 'src/auth/auth_user.guard';

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

  @UseGuards(AuthUserGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image1', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'image3', maxCount: 1 },
    ]),
  )
  post(
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

  @Get('all_posts')
  getAllPosts(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.postService.getAllPosts(page, pageSize);
  }

  @UseGuards(AuthUserGuard)
  @Get('all_my_post')
  getMyPosts(@Req() req: any) {
    return this.postService.getAllMyPost(req['user_data'].id);
  }
}
