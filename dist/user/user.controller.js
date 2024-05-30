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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const auth_user_guard_1 = require("../auth/auth_user.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    register(createUserDto) {
        return this.userService.register(createUserDto);
    }
    myDetail(req) {
        return this.userService.findUser(req['user_data'].id);
    }
    async getFriendRecoment(req) {
        return this.userService.getUsersExcludingFriends(req['user_data'].id);
    }
    detailUser(id) {
        console.log('id', id);
        return this.userService.findUser(id);
    }
    detailUserFriendList(id) {
        console.log('id', id);
        return this.userService.getUsersExcludingFriends(id);
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async getTeamMemberUsers() {
        return this.userService.getAllUsers();
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Get)('my_detail'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "myDetail", null);
__decorate([
    (0, common_1.UseGuards)(auth_user_guard_1.AuthUserGuard),
    (0, common_1.Get)('friend_recommend'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFriendRecoment", null);
__decorate([
    (0, common_1.Get)('user_detail'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "detailUser", null);
__decorate([
    (0, common_1.Get)('friend_list'),
    __param(0, (0, common_1.Query)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "detailUserFriendList", null);
__decorate([
    (0, common_1.Get)('user_list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('team_member_list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getTeamMemberUsers", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map