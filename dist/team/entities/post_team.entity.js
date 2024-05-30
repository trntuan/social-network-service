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
exports.PostTeam = void 0;
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./team.entity");
const post_entity_1 = require("../../post/entities/post.entity");
let PostTeam = class PostTeam {
};
exports.PostTeam = PostTeam;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'team_id' }),
    __metadata("design:type", Number)
], PostTeam.prototype, "team_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'post_id' }),
    __metadata("design:type", Number)
], PostTeam.prototype, "post_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 0, comment: '1 có ẩn danh, 0 không' }),
    __metadata("design:type", Number)
], PostTeam.prototype, "incognito", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint', default: 1, comment: '1 có chấp thuân, 0 không' }),
    __metadata("design:type", Number)
], PostTeam.prototype, "approve", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, (team) => team.postTeam, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'team_id' }),
    __metadata("design:type", team_entity_1.Team)
], PostTeam.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.postTeam, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'post_id' }),
    __metadata("design:type", post_entity_1.Post)
], PostTeam.prototype, "post", void 0);
exports.PostTeam = PostTeam = __decorate([
    (0, typeorm_1.Entity)()
], PostTeam);
//# sourceMappingURL=post_team.entity.js.map