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

  @Get('detail')
  async getPostDetails(@Query('post_id') id: number) {
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

  // ============================= cms ==============================================

  @Get('all_posts')
  getAllPosts(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.postService.getAllPosts(page, pageSize);
  }

  @Get('team_all_posts') // not run
  getTeamAllPosts(
    @Query('page') page: number,
    @Query('team_id') teamId: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.postService.getAllPosts(page, pageSize);
  }

  @Get('comment_list')
  async getDetailCommentPost(
    @Query('post_id') id: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    {
      return this.postService.getCommentPost(id, page, pageSize);
    }
  }

  @Get('post_report_list') // not run
  async getAllPostsReport(
    @Query('post_id') id: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    {
      return this.postService.getAllPostsReport(page, pageSize);
    }
  }

  @Get('user_post_list')
  getPostAllUserCms(
    @Query('user_id') user_id: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.postService.getAllMyPost(user_id, page, pageSize);
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

  @UseGuards(AuthUserGuard)
  @Get('all_my_post')
  getMyPosts(
    @Req() req: any,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.postService.getAllMyPost(req['user_data'].id, page, pageSize);
  }
}
