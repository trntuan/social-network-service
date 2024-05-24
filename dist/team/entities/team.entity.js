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
exports.Team = void 0;
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
const team_member_entity_1 = require("./team_member.entity");
const post_team_entity_1 = require("./post_team.entity");
let Team = class Team {
};
exports.Team = Team;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Team.prototype, "team_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], Team.prototype, "team_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, nullable: true }),
    __metadata("design:type", String)
], Team.prototype, "logo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Team.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'creator_user' }),
    __metadata("design:type", Number)
], Team.prototype, "creator_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 0,
        comment: '(0: riêng tư, 1: công khai)',
    }),
    __metadata("design:type", Number)
], Team.prototype, "privacy_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 0,
        comment: '(0: bài viết đăng tự do, 1: bài viết cần duyệt)',
    }),
    __metadata("design:type", Number)
], Team.prototype, "review_type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.teams),
    (0, typeorm_1.JoinColumn)({ name: 'creator_user' }),
    __metadata("design:type", user_entity_1.User)
], Team.prototype, "creator_user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => team_member_entity_1.TeamMember, (teamMember) => teamMember.team),
    __metadata("design:type", Array)
], Team.prototype, "teamMembers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => post_team_entity_1.PostTeam, (postTeam) => postTeam.team),
    __metadata("design:type", Array)
], Team.prototype, "postTeam", void 0);
exports.Team = Team = __decorate([
    (0, typeorm_1.Entity)()
], Team);
//# sourceMappingURL=team.entity.js.map