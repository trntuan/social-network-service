"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const post_entity_1 = require("./entities/post.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_image_entity_1 = require("./entities/post_image.entity");
const file_upload_service_1 = require("../file-upload/file-upload.service");
const comment_entity_1 = require("./entities/comment.entity");
const credibility_post_entity_1 = require("./entities/credibility_post.entity");
let PostService = class PostService {
    constructor(postRepository, fileUploadService, postImageRepository, commentRepository, credibilityPostRepository) {
        this.postRepository = postRepository;
        this.fileUploadService = fileUploadService;
        this.postImageRepository = postImageRepository;
        this.commentRepository = commentRepository;
        this.credibilityPostRepository = credibilityPostRepository;
    }
    async createPost(createPostDto, userId, files) {
        const newPost = new post_entity_1.Post();
        newPost.content = createPostDto.content;
        newPost.privacy_type = createPostDto.privacy_type;
        newPost.user_post = userId;
        newPost.hasImage = 0;
        newPost.created_date = new Date();
        newPost.modified_date = null;
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
    async getAllMyPost(userId, page = 1, pageSize = 30) {
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
            post.post_image_url = images.map((image) => image.postImage_post_image_url);
        }
        return posts;
    }
    async getAllPostsReport(page, pageSize = 30) {
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
            'reportPost.reason',
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
            post.post_image_url = images.map((image) => image.postImage_post_image_url);
        }
        return posts;
    }
    async getAllPosts(page, pageSize = 30) {
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
            post.post_image_url = images.map((image) => image.postImage_post_image_url);
        }
        return posts;
    }
    async getPostDetails(postId) {
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
        posts.post_image_url = images.map((image) => image.postImage_post_image_url);
        return posts;
    }
    async likePost(userId, postId, likeValue) {
        if (likeValue == 1) {
            const newCredibilityPost = new credibility_post_entity_1.CredibilityPost();
            newCredibilityPost.user_id = userId;
            newCredibilityPost.post_id = postId;
            newCredibilityPost.credibility = 1;
            await this.credibilityPostRepository.save(newCredibilityPost);
            return { statusCode: 200, message: 'Post liked successfully.' };
        }
        else if (likeValue == 0) {
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
    async getCommentPost(postId, page = 1, pageSize = 10) {
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
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getRawMany();
        return comments;
    }
    async createPostImage(url, postId) {
        const newPostImage = new post_image_entity_1.PostImage();
        newPostImage.post_image_url = url;
        newPostImage.post_id = postId;
        await this.postImageRepository.save(newPostImage);
        return newPostImage;
    }
    async createComment(content, postId, userId, comment_parent_id) {
        const comment = new comment_entity_1.Comment();
        comment.post_id = postId;
        comment.content = content;
        comment.user_id = userId;
        if (comment_parent_id != null) {
            comment.parent_comment_id = comment_parent_id;
        }
        await this.commentRepository.save(comment);
        return comment;
    }
    async getAllPostsPersonal(userId, page, pageSize = 30) {
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
            post.post_image_url = images.map((image) => image.postImage_post_image_url);
            const credibilityPost = await this.credibilityPostRepository.findOne({
                where: { user_id: userId, post_id: post.post_post_id },
            });
            post.like_value = credibilityPost ? credibilityPost.credibility : 0;
        }
        return posts;
    }
    async getPostDetailsPersonal(userId, postId) {
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
        posts.post_image_url = images.map((image) => image.postImage_post_image_url);
        const credibilityPost = await this.credibilityPostRepository.findOne({
            where: { user_id: userId, post_id: posts.post_post_id },
        });
        posts.like_value = credibilityPost ? credibilityPost.credibility : 0;
        return posts;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(post_image_entity_1.PostImage)),
    __param(3, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(4, (0, typeorm_1.InjectRepository)(credibility_post_entity_1.CredibilityPost)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_upload_service_1.FileUploadService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map