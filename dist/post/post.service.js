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
let PostService = class PostService {
    constructor(postRepository, fileUploadService, postImageRepository) {
        this.postRepository = postRepository;
        this.fileUploadService = fileUploadService;
        this.postImageRepository = postImageRepository;
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
                console.log('linkImage', uploaded_image);
            }
        }
        console.log('result', JSON.stringify(result));
        return result;
    }
    async getAllMyPost(userId) {
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
            post.post_image_url = images.map((image) => image.postImage_post_image_url);
        }
        return posts;
    }
    async getAllPosts(page, pageSize = 30) {
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
            'COUNT(comment.comment_id) AS commentCount',
            'COUNT(credibilityPost.user_id) AS credibilityCount',
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
    async createPostImage(url, postId) {
        const newPostImage = new post_image_entity_1.PostImage();
        newPostImage.post_image_url = url;
        newPostImage.post_id = postId;
        await this.postImageRepository.save(newPostImage);
        return newPostImage;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_1.InjectRepository)(post_image_entity_1.PostImage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        file_upload_service_1.FileUploadService,
        typeorm_2.Repository])
], PostService);
//# sourceMappingURL=post.service.js.map