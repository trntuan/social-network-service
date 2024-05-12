import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  register(@Req() req: any, @Body() createUserDto: CreatePostDto) {
    console.log('[id]121212:', req['user_data'].id);

    return this.postService.create(createUserDto);
  }
}
