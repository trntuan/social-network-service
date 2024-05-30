import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostImage } from './entities/post_image.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { Comment } from './entities/comment.entity';
import { CredibilityPost } from './entities/credibility_post.entity';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    private fileUploadService: FileUploadService,
    @InjectRepository(PostImage)
    private postImageRepository: Repository<PostImage>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(CredibilityPost)
    private credibilityPostRepository: Repository<CredibilityPost>,
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
      }
    }

    console.log('result', JSON.stringify(result));

    return result;
  }

  async getAllMyPost(userId: number, page: number = 1, pageSize: number = 30) {
    const commentCountSubQuery = this.postRepository
      .createQueryBuilder('post2')
      .leftJoin('post2.comments', 'comment')
      .where('post2.post_id = post.post_id')
      .select('COUNT(comment.comment_id)', 'commentCount');

    const credibilityCountSubQuery = this.postRepository
      .createQueryBuilder('post3')
      .leftJoin('post3.department_post', 'credibilityPost')
      .where('post3.post_id = post.post_id')
      .select('COUNT(credibilityPost.user_id)', 'credibilityCount');

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
        'post.created_date',
        'post.privacy_type',
        `(${commentCountSubQuery.getQuery()}) AS commentCount`,
        `(${credibilityCountSubQuery.getQuery()}) AS credibilityCount`,
      ])
      .groupBy('post.post_id')
      .orderBy('post.created_date', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getRawMany();

    for (const post of posts) {
      const images = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.post_images', 'postImage')
        .where('postImage.post_id = :postId', { postId: post.post_post_id })
        .select('postImage.post_image_url')
        .getRawMany();

      post.post_image_url = images.map(
        (image) => image.postImage_post_image_url,
      );
    }

    return posts;
  }

  async getAllPostsReport(page: number, pageSize: number = 30) {
    const commentCountSubQuery = this.postRepository
      .createQueryBuilder('post2')
      .leftJoin('post2.comments', 'comment')
      .where('post2.post_id = post.post_id')
      .select('COUNT(comment.comment_id)', 'commentCount');

    const credibilityCountSubQuery = this.postRepository
      .createQueryBuilder('post3')
      .leftJoin('post3.department_post', 'credibilityPost')
      .where('post3.post_id = post.post_id')
      .select('COUNT(credibilityPost.user_id)', 'credibilityCount');

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .innerJoinAndSelect('post.reportPosts', 'reportPost')
      .addSelect('reportPost.reason')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.department_post', 'credibilityPost')
      .select([
        'post.post_id',
        'post.user_post',
        'user.display_name',
        'user.avatar',
        'post.content',
        'post.created_date',
        'post.privacy_type',
        `(${commentCountSubQuery.getQuery()}) AS commentCount`,
        `(${credibilityCountSubQuery.getQuery()}) AS credibilityCount`,
      ])
      .groupBy('post.post_id')
      .orderBy('post.created_date', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getRawMany();

    for (const post of posts) {
      const images = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.post_images', 'postImage')
        .where('postImage.post_id = :postId', { postId: post.post_post_id })
        .select('postImage.post_image_url')
        .getRawMany();

      post.post_image_url = images.map(
        (image) => image.postImage_post_image_url,
      );
    }

    return posts;
  }

  async getAllPosts(page: number, pageSize: number = 30) {
    const commentCountSubQuery = this.postRepository
      .createQueryBuilder('post2')
      .leftJoin('post2.comments', 'comment')
      .where('post2.post_id = post.post_id')
      .select('COUNT(comment.comment_id)', 'commentCount');

    const credibilityCountSubQuery = this.postRepository
      .createQueryBuilder('post3')
      .leftJoin('post3.department_post', 'credibilityPost')
      .where('post3.post_id = post.post_id')
      .select('COUNT(credibilityPost.user_id)', 'credibilityCount');

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.department_post', 'credibilityPost')
      .select([
        'post.post_id',
        'post.user_post',
        'user.display_name',
        'user.avatar',
        'post.content',
        'post.created_date',
        'post.privacy_type',
        `(${commentCountSubQuery.getQuery()}) AS commentCount`,
        `(${credibilityCountSubQuery.getQuery()}) AS credibilityCount`,
      ])
      .groupBy('post.post_id')
      .orderBy('post.created_date', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getRawMany();

    for (const post of posts) {
      const images = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.post_images', 'postImage')
        .where('postImage.post_id = :postId', { postId: post.post_post_id })
        .select('postImage.post_image_url')
        .getRawMany();

      post.post_image_url = images.map(
        (image) => image.postImage_post_image_url,
      );
    }

    return posts;
  }

  async getPostDetails(postId: number) {
    const commentCountSubQuery = this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.comments', 'comment')
      .where('post.post_id = :postId', { postId })
      .select('COUNT(comment.comment_id)', 'commentCount');

    const credibilityCountSubQuery = this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.department_post', 'credibilityPost')
      .where('post.post_id = :postId', { postId })
      .select('COUNT(credibilityPost.user_id)', 'credibilityCount');

    console.log('postId', postId);
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.department_post', 'credibilityPost')
      .where('post.post_id = :postId', { postId })
      .select([
        'post.post_id',
        'post.user_post',
        'user.display_name',
        'user.avatar',
        'post.content',
        'post.created_date',
        'post.privacy_type',
        `(${commentCountSubQuery.getQuery()}) AS commentCount`,
        `(${credibilityCountSubQuery.getQuery()}) AS credibilityCount`,
      ])
      .getRawOne();

    const images = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.post_images', 'postImage')
      .where('postImage.post_id = :postId', { postId })
      .select('postImage.post_image_url')
      .getRawMany();

    posts.post_image_url = images.map(
      (image) => image.postImage_post_image_url,
    );

    return posts;
  }

  async likePost(userId: number, postId: number, likeValue: number) {
    // console.log('postId:', postId);
    // console.log('likeValue:', likeValue);
    if (likeValue == 1) {
      const newCredibilityPost = new CredibilityPost();
      newCredibilityPost.user_id = userId;
      newCredibilityPost.post_id = postId;
      newCredibilityPost.credibility = 1;
      await this.credibilityPostRepository.save(newCredibilityPost);
      return { statusCode: 200, message: 'Post liked successfully.' };
    } else if (likeValue == 0) {
      const credibilityPost = await this.credibilityPostRepository.findOne({
        where: { user_id: userId, post_id: postId },
      });
      if (credibilityPost) {
        await this.credibilityPostRepository.remove(credibilityPost);
        return { statusCode: 200, message: 'Post unliked successfully.' };
      }
    }
    return { statusCode: 400, message: 'Operation failed.' };
  }

  async getCommentPost(
    postId: number,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const comments = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comments')
      .leftJoinAndSelect('comments.user', 'user')
      .where('comments.post_id = :postId', { postId })
      .select([
        'comments.comment_id',
        'comments.content',
        'comments.created_date',
        'comments.user_id',
        'comments.parent_comment_id',
        'user.display_name',
        'user.avatar',
        'user.user_id',
      ])
      .orderBy('comments.created_date', 'DESC')
      .skip((page - 1) * pageSize) // Skip the previous pages
      .take(pageSize) // Limit the result to pageSize
      .getRawMany();

    return comments;
  }

  async createPostImage(url: string, postId: number): Promise<PostImage> {
    const newPostImage = new PostImage();
    newPostImage.post_image_url = url;
    newPostImage.post_id = postId;
    await this.postImageRepository.save(newPostImage);
    return newPostImage;
  }

  async createComment(
    content: string,
    postId: number,
    userId: number,
    comment_parent_id: number,
  ): Promise<Comment> {
    const comment = new Comment();
    comment.post_id = postId;
    comment.content = content;
    comment.user_id = userId;
    if (comment_parent_id != null) {
      comment.parent_comment_id = comment_parent_id;
    }
    await this.commentRepository.save(comment);
    return comment;
  }

  ///
  async getAllPostsPersonal(
    userId: number,
    page: number,
    pageSize: number = 30,
  ) {
    const commentCountSubQuery = this.postRepository
      .createQueryBuilder('post2')
      .leftJoin('post2.comments', 'comment')
      .where('post2.post_id = post.post_id')
      .select('COUNT(comment.comment_id)', 'commentCount');

    const credibilityCountSubQuery = this.postRepository
      .createQueryBuilder('post3')
      .leftJoin('post3.department_post', 'credibilityPost')
      .where('post3.post_id = post.post_id')
      .select('COUNT(credibilityPost.user_id)', 'credibilityCount');

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.post_id',
        'post.user_post',
        'user.display_name',
        'user.avatar',
        'post.content',
        'post.created_date',
        'post.privacy_type',
        `(${commentCountSubQuery.getQuery()}) AS commentCount`,
        `(${credibilityCountSubQuery.getQuery()}) AS credibilityCount`,
      ])
      .orderBy('post.created_date', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getRawMany();

    for (const post of posts) {
      const images = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.post_images', 'postImage')
        .where('postImage.post_id = :postId', { postId: post.post_post_id })
        .select('postImage.post_image_url')
        .getRawMany();

      post.post_image_url = images.map(
        (image) => image.postImage_post_image_url,
      );

      const credibilityPost = await this.credibilityPostRepository.findOne({
        where: { user_id: userId, post_id: post.post_post_id },
      });

      post.like_value = credibilityPost ? credibilityPost.credibility : 0;
    }

    return posts;
  }

  async getPostDetailsPersonal(userId: number, postId: number) {
    const commentCountSubQuery = this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.comments', 'comment')
      .where('post.post_id = :postId', { postId })
      .select('COUNT(comment.comment_id)', 'commentCount');

    const credibilityCountSubQuery = this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.department_post', 'credibilityPost')
      .where('post.post_id = :postId', { postId })
      .select('COUNT(credibilityPost.user_id)', 'credibilityCount');

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.department_post', 'credibilityPost')
      .where('post.post_id = :postId', { postId })
      .select([
        'post.post_id',
        'post.user_post',
        'user.display_name',
        'user.avatar',
        'post.content',
        'post.created_date',
        'post.privacy_type',
        `(${commentCountSubQuery.getQuery()}) AS commentCount`,
        `(${credibilityCountSubQuery.getQuery()}) AS credibilityCount`,
      ])
      .getRawOne();

    const images = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.post_images', 'postImage')
      .where('postImage.post_id = :postId', { postId })
      .select('postImage.post_image_url')
      .getRawMany();

    posts.post_image_url = images.map(
      (image) => image.postImage_post_image_url,
    );

    const credibilityPost = await this.credibilityPostRepository.findOne({
      where: { user_id: userId, post_id: posts.post_post_id },
    });

    posts.like_value = credibilityPost ? credibilityPost.credibility : 0;

    return posts;
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
