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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const platform_express_1 = require("@nestjs/platform-express");
const auth_user_guard_1 = require("../auth/auth_user.guard");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const like_post_dto_1 = require("./dto/like-post.dto");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    createPost(req, files, createUserDto) {
        return this.postService.createPost(createUserDto, req['user_data'].id, files);
    }
    async likePost(req, dto) {
        return this.postService.likePost(req['user_data'].id, dto.post_id, dto.value);
    }
    createCommemt(req, dto) {
        console.log('req[user_data].id:', req['user_data'].id);
        console.log('dto.post_id:', dto.post_id);
        console.log('dto:', dto);
        return this.postService.createComment(dto.content, dto.post_id, req['user_data'].id, dto.parent_id);
    }
    async getPostDetails(id) {
        return this.postService.getPostDetails(id);
    }
    async getComment(id, page, pageSize) {
        {
            return this.postService.getCommentPost(id, page, pageSize);
        }
    }
    getAllPosts(page, pageSize) {
        return this.postService.getAllPosts(page, pageSize);
    }
    getTeamAllPosts(page, teamId, pageSize) {
        return this.postService.getAllPosts(page, pageSize);
    }
    async getDetailCommentPost(id, page, pageSize) {
        {
            return this.postService.getCommentPost(id, page, pageSize);
        }
    }
    async getAllPostsReport(id, page, pageSize) {
        {
            return this.postService.getAllPostsReport(page, pageSize);
        }
    }
    getPostAllUserCms(user_id, page, pageSize) {
        return this.postService.getAllMyPost(user_id, page, pageSize);
    }
    getAllPostsPersonal(req, page, pageSize) {
        return this.postService.getAllPostsPersonal(req['user_data'].id, page, pageSize);
    }
    async getPostDetailsPersonal(req, id) {
        return this.postService.getPostDetailsPersonal(req['user_data'].id, id);
    }
    getMyPosts(req, page, pageSize) {
        return this.postService.getAllMyPost(req['user_data'].id, page, pageSize);
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
    ])),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Post)('like'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, like_post_dto_1.LikePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likePost", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Post)('comment'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createCommemt", null);
__decorate([
    (0, common_1.Get)('detail'),
    __param(0, (0, common_1.Query)('post_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostDetails", null);
__decorate([
    (0, common_1.Get)('comment'),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getComment", null);
__decorate([
    (0, common_1.Get)('all_posts'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)('team_all_posts'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('team_id')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getTeamAllPosts", null);
__decorate([
    (0, common_1.Get)('comment_list'),
    __param(0, (0, common_1.Query)('post_id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getDetailCommentPost", null);
__decorate([
    (0, common_1.Get)('post_report_list'),
    __param(0, (0, common_1.Query)('post_id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllPostsReport", null);
__decorate([
    (0, common_1.Get)('user_post_list'),
    __param(0, (0, common_1.Query)('user_id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostAllUserCms", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Get)('all_posts_personal'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllPostsPersonal", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Get)('detail_personal'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPostDetailsPersonal", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Get)('all_my_post'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('pageSize')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getMyPosts", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map