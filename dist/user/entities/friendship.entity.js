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
exports.Friendship = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Friendship = class Friendship {
};
exports.Friendship = Friendship;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user_id_1' }),
    __metadata("design:type", Number)
], Friendship.prototype, "user_id_1", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'user_id_2' }),
    __metadata("design:type", Number)
], Friendship.prototype, "user_id_2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.friendships1, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id_1' }),
    __metadata("design:type", user_entity_1.User)
], Friendship.prototype, "user1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.friendships2, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id_2' }),
    __metadata("design:type", user_entity_1.User)
], Friendship.prototype, "user2", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'tinyint' }),
    __metadata("design:type", Number)
], Friendship.prototype, "status_id", void 0);
exports.Friendship = Friendship = __decorate([
    (0, typeorm_1.Entity)()
], Friendship);
//# sourceMappingURL=friendship.entity.js.map