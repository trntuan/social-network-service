import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = new Post();
    newPost.content = createPostDto.content;
    newPost.privacy_type = createPostDto.privacy_type;
    newPost.user_post = 1;
    // newPost.post_images = createPostDto.post_images;
    // ... set other fields as needed
    newPost.hasImage = 0; // default value
    newPost.created_date = new Date(); // current date
    newPost.modified_date = null; // default value
    const result = this.postRepository.save(newPost);
    console.log('result', JSON.stringify(result));

    return result;
  }
}
