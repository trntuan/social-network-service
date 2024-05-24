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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const report_post_entity_1 = require("./report_post.entity");
const credibility_post_entity_1 = require("./credibility_post.entity");
const post_image_entity_1 = require("./post_image.entity");
const post_team_entity_1 = require("../../team/entities/post_team.entity");
const comment_entity_1 = require("./comment.entity");
let Post = class Post {
};
exports.Post = Post;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 5000 }),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Post.prototype, "user_post", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0, comment: '1 có, 0 không' }),
    __metadata("design:type", Number)
], Post.prototype, "hasImage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 0,
        comment: '(0: chỉ mình tôi, 1: bạn bè, 2: tất cả)',
    }),
    __metadata("design:type", Number)
], Post.prototype, "privacy_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Post.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true, default: null }),
    __metadata("design:type", Date)
], Post.prototype, "modified_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.posts, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_post' }),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_post_entity_1.ReportPost, (reportPost) => reportPost.post),
    __metadata("design:type", Array)
], Post.prototype, "reportPosts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => credibility_post_entity_1.CredibilityPost, (credibilityPost) => credibilityPost.post),
    __metadata("design:type", Array)
], Post.prototype, "department_post", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_image_entity_1.PostImage, (postImage) => postImage.post),
    __metadata("design:type", Array)
], Post.prototype, "post_images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_team_entity_1.PostTeam, (postTeam) => postTeam.post),
    __metadata("design:type", Array)
], Post.prototype, "postTeam", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)()
], Post);
//# sourceMappingURL=post.entity.js.map