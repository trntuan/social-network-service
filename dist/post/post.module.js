"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
const post_entity_1 = require("./entities/post.entity");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const file_upload_module_1 = require("../file-upload/file-upload.module");
const file_upload_service_1 = require("../file-upload/file-upload.service");
const minio_client_service_1 = require("../minio-client/minio-client.service");
const post_image_entity_1 = require("./entities/post_image.entity");
const user_entity_1 = require("../user/entities/user.entity");
const comment_entity_1 = require("./entities/comment.entity");
const credibility_post_entity_1 = require("./entities/credibility_post.entity");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post, post_image_entity_1.PostImage, user_entity_1.User, comment_entity_1.Comment, credibility_post_entity_1.CredibilityPost]),
            config_1.ConfigModule,
            file_upload_module_1.FileUploadModule,
        ],
        controllers: [post_controller_1.PostController],
        providers: [post_service_1.PostService, file_upload_service_1.FileUploadService, minio_client_service_1.MinioClientService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map