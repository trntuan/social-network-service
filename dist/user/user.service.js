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
exports.UserService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    create(createUserDto) {
        console.log(createUserDto);
        return this.userRepository.save(createUserDto);
    }
    async getAllUsers() {
        return this.userRepository.find({
            select: [
                'user_id',
                'display_name',
                'avatar',
                'email',
                'gender',
                'is_active',
            ],
        });
    }
    async findUser(userId) {
        return (this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.posts', 'post')
            .where('user.user_id = :userId', { userId })
            .where('user.user_id = :userId', { userId })
            .addSelect('user.user_id', 'user_id')
            .addSelect('user.display_name', 'display_name')
            .addSelect('user.avatar', 'avatar')
            .addSelect('user.email', 'email')
            .addSelect('user.gender', 'gender')
            .addSelect('user.date_of_birth', 'date_of_birth')
            .addSelect('user.interests', 'interests')
            .addSelect('user.location', 'location')
            .addSelect('user.is_active', 'is_active')
            .groupBy('user.user_id')
            .getRawOne());
    }
    async register(registerDto) {
        const { email } = registerDto;
        console.log('registerDto:', registerDto);
        const query = this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email });
        const existingUser = await query.getOne();
        console.log('existingUser:', existingUser);
        if (existingUser) {
            const response = {
                statusCode: '400',
                message: 'Email đã tồn tại!',
                user: null,
            };
            return response;
        }
        else {
            const user = await this.userRepository.save(registerDto);
            const response = {
                statusCode: '200',
                message: 'Đăng ký thành công!',
                user: user,
            };
            console.log('response:', response);
            return response;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map