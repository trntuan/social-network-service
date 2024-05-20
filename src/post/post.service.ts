import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostImage } from './entities/post_image.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private fileUploadService: FileUploadService,
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
  ) {}

  async createPost(
    createPostDto: CreatePostDto,
    userId: number,
    files: BufferedFile,
  ) {
    const newPost = new Post();
    newPost.content = createPostDto.content;
    newPost.privacy_type = createPostDto.privacy_type;
    newPost.user_post = userId;
    // newPost.post_images = createPostDto.post_images;
    newPost.hasImage = 0; // default value
    newPost.created_date = new Date(); // current date
    newPost.modified_date = null; // default value
    const result = await this.postRepository.save(newPost);

    for (let i = 1; i < 4; i++) {
      if (files[`image${i}`] != null) {
        const image = files[`image${i}`][0];

        const uploaded_image = await this.fileUploadService.uploadSingle(image);
        this.createPostImage(uploaded_image, result.post_id);
        console.log('linkImage', uploaded_image);
      }
    }

    console.log('result', JSON.stringify(result));

    return result;
  }

  async getAllMyPost(userId: number) {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.department_post', 'credibilityPost')

      .where('post.user_post = :userId', { userId })
      .select([
        'post.post_id',
        'post.user_post',
        'user.display_name',
        'user.avatar',
        'post.content',
        'post.privacy_type',
        'COUNT(comment.comment_id) AS commentCount',
        'COUNT(credibilityPost.user_id) AS credibilityCount',
      ])
      .groupBy('post.post_id')
      .getRawMany();

    for (const post of posts) {
      console.log('post', post.post_post_id);

      const images = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.post_images', 'postImage')
        .where('postImage.post_id = :postId', { postId: post.post_post_id })
        .select('postImage.post_image_url')
        .getRawMany();

      console.log('images', images);

      post.post_image_url = images.map(
        (image) => image.postImage_post_image_url,
      );
    }

    return posts;
  }

  async createPostImage(url: string, postId: number): Promise<PostImage> {
    const newPostImage = new PostImage();
    newPostImage.post_image_url = url;
    newPostImage.post_id = postId;
    await this.postImageRepository.save(newPostImage);
    return newPostImage;
  }

  // async createPostImageMany(
  //   urls: string[],
  //   postId: number,
  // ): Promise<PostImage[]> {
  //   const result = await Promise.all(
  //     urls.map(async (url) => await this.createPostImage(url, postId)),
  //   );
  //   return result;
  // }
}
