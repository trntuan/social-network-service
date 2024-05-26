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
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikePostDto } from './dto/like-post.dto';

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
  createPost(
    @Req() req: any,
    @UploadedFiles() files: BufferedFile,
    @Body() createUserDto: CreatePostDto,
  ) {
    return this.postService.createPost(
      createUserDto,
      req['user_data'].id,
      files,
    );
  }

  @UseGuards(AuthUserGuard)
  @Post('like')
  async likePost(@Req() req: any, @Body() dto: LikePostDto) {
    // console.log('req[user_data].id:', req['user_data']);

    return this.postService.likePost(
      req['user_data'].id,
      dto.post_id,
      dto.value,
    );
  }

  @UseGuards(AuthUserGuard)
  @Post('comment')
  createCommemt(
    @Req() req: any,
    @Body()
    dto: CreateCommentDto,
  ) {
    // console.log('bodyParser.json():', bodyParser.json().toString());
    console.log('req[user_data].id:', req['user_data'].id);

    console.log('dto.post_id:', dto.post_id);
    console.log('dto:', dto);
    return this.postService.createComment(
      dto.content,
      dto.post_id,
      req['user_data'].id,
      dto.parent_id,
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

  @Get('detail')
  async getPostDetails(@Query('id') id: number) {
    return this.postService.getPostDetails(id);
  }

  @Get('comment')
  async getComment(
    @Query('id') id: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    {
      return this.postService.getCommentPost(id, page, pageSize);
    }
  }

  //============================== personal =================================================
  @UseGuards(AuthUserGuard)
  @Get('all_posts_personal')
  getAllPostsPersonal(
    @Req() req: any,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.postService.getAllPostsPersonal(
      req['user_data'].id,
      page,
      pageSize,
    );
  }

  @UseGuards(AuthUserGuard)
  @Get('detail_personal')
  async getPostDetailsPersonal(@Req() req: any, @Query('id') id: number) {
    return this.postService.getPostDetailsPersonal(req['user_data'].id, id);
  }
}
