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
const friendship_entity_1 = require("./entities/friendship.entity");
let UserService = class UserService {
    constructor(userRepository, friendshipRepository) {
        this.userRepository = userRepository;
        this.friendshipRepository = friendshipRepository;
    }
    create(createUserDto) {
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
    async createFriendship(user_id_1, user_id_2) {
        const friendship = new friendship_entity_1.Friendship();
        friendship.user_id_1 = user_id_1;
        friendship.user_id_2 = user_id_2;
        friendship.status_id = 1;
        return this.friendshipRepository.save(friendship);
    }
    async blockUser(user_id_1, user_id_2) {
        const friendship = await this.friendshipRepository.findOne({
            where: { user_id_1, user_id_2 },
        });
        if (!friendship) {
            throw new Error('Friendship not found');
        }
        friendship.status_id = 0;
        return this.friendshipRepository.save(friendship);
    }
    async confirmFriendship(user_id_1, user_id_2) {
        const friendship = await this.friendshipRepository.findOne({
            where: { user_id_1, user_id_2 },
        });
        if (!friendship) {
            throw new Error('Friendship not found');
        }
        friendship.status_id = 2;
        return this.friendshipRepository.save(friendship);
    }
    async cancelFriendship(user_id_1, user_id_2) {
        const friendship = await this.friendshipRepository.findOne({
            where: { user_id_1, user_id_2 },
        });
        if (!friendship) {
            throw new Error('Friendship not found');
        }
        return this.friendshipRepository.remove(friendship);
    }
    async getFriendYouSent(userId) {
        let excludedUserIds = await this.friendshipRepository
            .createQueryBuilder('friendship')
            .where('friendship.user_id_1 = :userId', { userId })
            .where('(friendship.user_id_1 = :userId) AND friendship.status_id = 1', {
            userId,
        })
            .getMany()
            .then((friendships) => friendships.map((f) => f.user_id_1 === userId ? f.user_id_2 : f.user_id_1));
        excludedUserIds = excludedUserIds.filter((id) => id !== userId);
        if (excludedUserIds.length === 0) {
            return;
        }
        const users = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.user_id', 'user.avatar', 'user.display_name'])
            .where('user.user_id IN (:...excludedUserIds)', { excludedUserIds })
            .getMany();
        const usersWithCommonFriends = await Promise.all(users.map(async (user) => {
            const commonFriends = await this.friendshipRepository
                .createQueryBuilder('friendship')
                .where('friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId', { userId: user.user_id })
                .andWhere('friendship.status_id = 2')
                .getCount();
            return {
                user_id: user.user_id,
                avatar: user.avatar,
                display_name: user.display_name,
                commonFriends: commonFriends ?? 0,
            };
        }));
        return usersWithCommonFriends;
    }
    async getFriendSentToYou(userId) {
        let excludedUserIds = await this.friendshipRepository
            .createQueryBuilder('friendship')
            .where('friendship.user_id_2 = :userId', { userId })
            .where('(friendship.user_id_2 = :userId) AND friendship.status_id = 1', {
            userId,
        })
            .getMany()
            .then((friendships) => friendships.map((f) => f.user_id_1 === userId ? f.user_id_2 : f.user_id_1));
        excludedUserIds = excludedUserIds.filter((id) => id !== userId);
        if (excludedUserIds.length === 0) {
            return;
        }
        const users = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.user_id', 'user.avatar', 'user.display_name'])
            .where('user.user_id IN (:...excludedUserIds)', { excludedUserIds })
            .getMany();
        const usersWithCommonFriends = await Promise.all(users.map(async (user) => {
            const commonFriends = await this.friendshipRepository
                .createQueryBuilder('friendship')
                .where('friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId', { userId: user.user_id })
                .andWhere('friendship.status_id = 2')
                .getCount();
            return {
                user_id: user.user_id,
                avatar: user.avatar,
                display_name: user.display_name,
                commonFriends: commonFriends ?? 0,
            };
        }));
        return usersWithCommonFriends;
    }
    async getUsersFriends(userId) {
        let excludedUserIds = await this.friendshipRepository
            .createQueryBuilder('friendship')
            .where('friendship.user_id_1 = :userId', { userId })
            .where('(friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId) AND friendship.status_id = 2', { userId })
            .getMany()
            .then((friendships) => friendships.map((f) => f.user_id_1 === userId ? f.user_id_2 : f.user_id_1));
        excludedUserIds = excludedUserIds.filter((id) => id !== userId);
        if (excludedUserIds.length === 0) {
            return;
        }
        const users = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.user_id', 'user.avatar', 'user.display_name'])
            .where('user.user_id IN (:...excludedUserIds)', { excludedUserIds })
            .getMany();
        const usersWithCommonFriends = await Promise.all(users.map(async (user) => {
            const commonFriends = await this.friendshipRepository
                .createQueryBuilder('friendship')
                .where('friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId', { userId: user.user_id })
                .andWhere('friendship.status_id = 2')
                .getCount();
            return {
                user_id: user.user_id,
                avatar: user.avatar,
                display_name: user.display_name,
                commonFriends: commonFriends ?? 0,
            };
        }));
        return usersWithCommonFriends;
    }
    async getUsersExcludingFriends(userId) {
        let excludedUserIds = await this.friendshipRepository
            .createQueryBuilder('friendship')
            .where('friendship.user_id_1 = :userId', { userId })
            .orWhere('friendship.user_id_2 = :userId', { userId })
            .andWhere('friendship.status_id = 2')
            .getMany()
            .then((friendships) => friendships.map((f) => f.user_id_1 === userId ? f.user_id_2 : f.user_id_1));
        excludedUserIds = excludedUserIds.filter((id) => id !== userId);
        let users;
        if (excludedUserIds.length === 0) {
            users = await this.userRepository
                .createQueryBuilder('user')
                .select(['user.user_id', 'user.avatar', 'user.display_name'])
                .where('user.user_id != :userId', { userId })
                .getMany();
        }
        else {
            users = await this.userRepository
                .createQueryBuilder('user')
                .select(['user.user_id', 'user.avatar', 'user.display_name'])
                .where('user.user_id NOT IN (:...excludedUserIds)', { excludedUserIds })
                .getMany();
        }
        const usersWithCommonFriends = await Promise.all(users.map(async (user) => {
            const commonFriends = await this.friendshipRepository
                .createQueryBuilder('friendship')
                .where('friendship.user_id_1 = :userId OR friendship.user_id_2 = :userId', { userId: user.user_id })
                .andWhere('friendship.status_id = 2')
                .getCount();
            return {
                user_id: user.user_id,
                avatar: user.avatar,
                display_name: user.display_name,
                commonFriends: commonFriends ?? 0,
            };
        }));
        return usersWithCommonFriends;
    }
    async findUser(userId) {
        return this.userRepository
            .createQueryBuilder('user')
            .select([
            'user.user_id',
            'user.display_name',
            'user.avatar',
            'user.email',
            'user.gender',
            'user.date_of_birth',
            'user.interests',
            'user.location',
            'user.is_active',
        ])
            .where('user.user_id = :userId', { userId })
            .addSelect((subQuery) => {
            return subQuery
                .select('COALESCE(COUNT(friendship1.user_id_1) + COUNT(friendship2.user_id_2), 0)', 'friendCount')
                .from('friendship', 'friendship1')
                .where('friendship1.user_id_1 = :userId', { userId })
                .from('friendship', 'friendship2')
                .where('friendship2.user_id_2 = :userId', { userId })
                .andWhere('friendship1.status_id = 2')
                .andWhere('friendship2.status_id = 2');
        }, 'friendCount')
            .groupBy('user.user_id')
            .getRawOne();
    }
    async register(registerDto) {
        const { email } = registerDto;
        const query = this.userRepository
            .createQueryBuilder('user')
            .where('user.email = :email', { email });
        const existingUser = await query.getOne();
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
            return response;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(friendship_entity_1.Friendship)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map