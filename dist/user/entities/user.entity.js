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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const friendship_entity_1 = require("./friendship.entity");
const user_major_entity_1 = require("../../major/entities/user_major.entity");
const notification_entity_1 = require("./notification.entity");
const post_entity_1 = require("../../post/entities/post.entity");
const report_post_entity_1 = require("../../post/entities/report_post.entity");
const credibility_post_entity_1 = require("../../post/entities/credibility_post.entity");
const credibility_user_entity_1 = require("./credibility_user.entity");
const team_entity_1 = require("../../team/entities/team.entity");
const team_member_entity_1 = require("../../team/entities/team_member.entity");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "display_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint' }),
    __metadata("design:type", Number)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "interests", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true, collation: 'utf8mb4_unicode_ci' }),
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, default: '' }),
    __metadata("design:type", String)
], User.prototype, "date_of_birth", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "refresh_token", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1, comment: '1 tieng viet, 2 tieng anh' }),
    __metadata("design:type", Number)
], User.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "created_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1, comment: '1 hoat dong, 2 khong' }),
    __metadata("design:type", Number)
], User.prototype, "is_active", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_major_entity_1.UserMajor, (userMajor) => userMajor.user),
    (0, typeorm_1.OneToMany)(() => friendship_entity_1.Friendship, (friendship) => friendship.user1),
    __metadata("design:type", Array)
], User.prototype, "friendships1", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => friendship_entity_1.Friendship, (friendship) => friendship.user2),
    __metadata("design:type", Array)
], User.prototype, "friendships2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_major_entity_1.UserMajor, (userMajor) => userMajor.user),
    __metadata("design:type", Array)
], User.prototype, "userMajor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.user),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_entity_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => report_post_entity_1.ReportPost, (reportPost) => reportPost.user),
    __metadata("design:type", Array)
], User.prototype, "reportPosts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => credibility_post_entity_1.CredibilityPost, (credibilityPost) => credibilityPost.user),
    __metadata("design:type", Array)
], User.prototype, "credibility_post", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => credibility_user_entity_1.CredibilityUser, (credibilityUser) => credibilityUser.user_credibility),
    __metadata("design:type", Array)
], User.prototype, "user_credibility", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => credibility_user_entity_1.CredibilityUser, (credibilityUser) => credibilityUser.user_believer),
    __metadata("design:type", Array)
], User.prototype, "user_believer_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_entity_1.Team, (team) => team.creator_user),
    __metadata("design:type", Array)
], User.prototype, "teams", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_member_entity_1.TeamMember, (teamMember) => teamMember.user),
    __metadata("design:type", Array)
], User.prototype, "TeamMembers", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
//# sourceMappingURL=user.entity.js.map