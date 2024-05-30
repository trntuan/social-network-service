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
exports.TeamMember = void 0;
const typeorm_1 = require("typeorm");
const team_entity_1 = require("./team.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const role_entity_1 = require("../../role/entities/role.entity");
let TeamMember = class TeamMember {
};
exports.TeamMember = TeamMember;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'team_id' }),
    __metadata("design:type", Number)
], TeamMember.prototype, "team_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user_id' }),
    __metadata("design:type", Number)
], TeamMember.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'role_id',
    }),
    __metadata("design:type", Number)
], TeamMember.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => team_entity_1.Team, (team) => team.teamMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'team_id' }),
    __metadata("design:type", team_entity_1.Team)
], TeamMember.prototype, "team", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.TeamMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], TeamMember.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (role) => role.teamMembers, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", role_entity_1.Role)
], TeamMember.prototype, "role", void 0);
exports.TeamMember = TeamMember = __decorate([
    (0, typeorm_1.Entity)()
], TeamMember);
//# sourceMappingURL=team_member.entity.js.map